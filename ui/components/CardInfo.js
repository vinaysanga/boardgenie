import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";


const CardInfo = (props) => {
    const {id, name, description} = props
    const router = useRouter()
    const [isTitleEditable, setTitleEditable] = useState(false)
    const [isDescEditable, setDescEditable] = useState(false)
    const nameRef = useRef(null)
    const descRef = useRef(null)
    const setEnabled = () => {
        setTitleEditable(true)
        setDescEditable(true)
        document.getElementById('card-info-close-btn').classList.remove('invisible')
        document.getElementById('card-info-save-btn').classList.remove('invisible')
        const desc = document.getElementById('desc-div')
        setTimeout(function () {
            desc.focus();
        }, 0);
    }

    const setDisabled = () => {
        setTitleEditable(false)
        setDescEditable(false)
        document.getElementById('card-info-close-btn').classList.add('invisible')
        document.getElementById('card-info-save-btn').classList.add('invisible')
    }

    const save = async () => {
        const task = {
            id: id,
            name: nameRef.current.innerHTML
            ,
            description: descRef.current.innerHTML

        }
        try {
            const res = await fetch('/api/saveTask', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
            if (!res.ok) {
                console.log(await res.text())
            }
        } catch (error) {
            console.log(error)
        }
        await props.mutate('/api/getAllTasks')
        router.back()
    }
    return <>
        <div className='flex p-10 space-x-5 justify-center'>
            <aside>
                <button className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md
                            ease-linear transition-all duration-150 hover:text-white hover:bg-black"
                        type="button"
                        onClick={router.back}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <button className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md
                ease-linear transition-all duration-150 hover:text-white hover:bg-black"
                        type="button"
                        onClick={setEnabled}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                    </svg>
                </button>
                <button className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md
                ease-linear transition-all duration-150 hover:text-white hover:bg-black"
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
            <section className='p-5 min-w-full min-h-full'>
                <div id='title-div'
                     className='text-5xl p-2 font-medium text-center focus:outline-gray-200 focus:bg-gray-50'
                     contentEditable={isTitleEditable} suppressContentEditableWarning={true}
                     ref={nameRef}
                >
                    {name}
                </div>
                <hr/>
                <div id='desc-div'
                     className='text-justify p-2 focus:outline-gray-200 focus:bg-gray-50 h-full'
                     contentEditable={isDescEditable} suppressContentEditableWarning={true}
                     ref={descRef}
                >
                    {description}
                </div>
                <div
                    className="flex items-center justify-end p-6 space-x-4">
                    <button id='card-info-close-btn'
                            className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg
                                hover:shadow-md ease-linear transition-all duration-150 hover:text-white hover:bg-black
                                invisible"
                            type="button"
                            onClick={setDisabled}
                    >
                        Cancel
                    </button>
                    <button id='card-info-save-btn'
                            className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg
                                hover:shadow-md ease-linear transition-all duration-150 hover:text-white hover:bg-black
                                invisible"
                            type="submit"
                            onClick={save}
                    >
                        Save
                    </button>
                </div>
            </section>
        </div>
    </>
}

export default CardInfo;