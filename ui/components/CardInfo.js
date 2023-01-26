import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";


function changeVisibility(setter, visibility, iconId) {
    setter(visibility)
    document.getElementById(iconId).classList.toggle('invisible')
}

const CardInfo = (props) => {
    const {id, name, description} = props
    const router = useRouter()
    const [isTitleEditable, setTitleEditable] = useState(false)
    const [isDescEditable, setDescEditable] = useState(false)
    const nameRef = useRef(null)
    const descRef = useRef(null)
    const save = async () => {
        const task = {
            id: id,
            name: nameRef.current.innerHTML,
            description: descRef.current.innerHTML
        }
        try {
            const res = await fetch('/api/saveTask', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
            if (!res.ok)
                console.log(await res.text())
            if (res.ok)
                props.mutate('/api/getAllTasks')
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <div className='p-40 pt-10 justify-center'>
            <aside>
                <button title='Go Back' className="px-6 py-2 text-gray-600 text-sm rounded-lg hover:shadow-sm
                ease-linear transition hover:text-white hover:bg-black hover:scale-105"
                        type="button"
                        onClick={router.back}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <button title='Delete task' className="px-6 py-2 text-gray-600 text-sm rounded-lg hover:shadow-sm
                ease-linear transition hover:text-white hover:bg-black hover:scale-105"
                        type="button"
                        onClick={() => {
                            props.removeTask(id).then(
                                props.mutate('/api/getAllTasks')
                            )
                            router.back()
                        }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </button>
            </aside>
            <section>
                <div id='title-div'
                     className='flex justify-between p-2 pr-0 outline-0 focus: outline-1 outline-gray-200 focus:bg-gray-50 focus:px-2 transition-all'
                     contentEditable={isTitleEditable} suppressContentEditableWarning={true}
                     onBlur={() => {
                         changeVisibility(setTitleEditable, false, 'title-edit-icon')
                         save()
                     }}
                     onKeyDown={event => {
                         if (event.key === 'Enter') {
                             document.getElementById('title-div').blur()
                         }
                     }}
                >
                    <h2 className='text-5xl font-medium text-center grow' ref={nameRef}>
                        {name}
                    </h2>
                    <svg id='title-edit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         className="w-5 h-5 fill-gray-300 hover:scale-110 hover:fill-black"
                         onClick={() => {
                             changeVisibility(setTitleEditable, true, 'title-edit-icon');
                             const element = document.getElementById('title-div')
                             setTimeout(() => element.focus(), 0);
                             document.getSelection().collapseToEnd();
                         }
                         }
                    >
                        <title>Edit title</title>
                        <path
                            d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"/>
                        <path
                            d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"/>
                    </svg>
                </div>
                <hr/>
                <div id='desc-div'
                     className='flex flex-col outline-0 focus: outline-1 outline-gray-200 focus:bg-gray-50 focus:px-2 transition-all'
                     contentEditable={isDescEditable} suppressContentEditableWarning={true}
                     onBlur={() => {
                         changeVisibility(setDescEditable, false, 'desc-edit-icon')
                         save()
                     }}
                >
                    <div className='self-end'>
                        <svg id='desc-edit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             className="w-5 h-5 fill-gray-300 hover:scale-110 hover:fill-black"
                             onClick={() => {
                                 changeVisibility(setDescEditable, true, 'desc-edit-icon');
                                 const element = document.getElementById('desc-div')
                                 setTimeout(() => element.focus(), 0);
                             }
                             }
                        >
                            <title>Edit description</title>
                            <path
                                d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"/>
                            <path
                                d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"/>
                        </svg>
                    </div>
                    <p className='text-justify'
                       ref={descRef}>
                        {description}
                    </p>
                </div>
            </section>
        </div>
    </>
}

export default CardInfo;