import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {ArrowLeftIcon, TrashIcon} from "@heroicons/react/24/solid";


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
        <div className='p-40 pt-10 justify-center h-screen'>
            <header className='bg-amber-200 rounded-t-lg p-1.5'>
                <button title='Go Back' className="px-6 py-2 text-gray-800 text-sm rounded-lg hover:shadow-sm
                ease-linear transition hover:text-white hover:bg-blue-600 hover:scale-105"
                        type="button"
                        onClick={router.back}
                >
                    <ArrowLeftIcon className='h-6 w-6 fill-gray-900'/>
                </button>
                <button title='Delete task' className="px-6 py-2 text-gray-800 text-sm rounded-lg hover:shadow-sm
                ease-linear transition hover:text-white hover:bg-red-600 hover:scale-105"
                        type="button"
                        onClick={() => {
                            props.removeTask(id).then(
                                props.mutate('/api/getAllTasks')
                            )
                            router.back()
                        }}
                >
                    <TrashIcon className='h-6 w-6 text-gray-900'/>
                </button>
                <div id='title-div'
                     className='flex justify-between p-2 pr-0 overflow-x-auto scrollbar-hide focus: outline-0 focus:px-1 transition-all'
                     contentEditable={isTitleEditable} suppressContentEditableWarning={true}
                     onClick={() => {
                         setTitleEditable(true)
                         const element = document.getElementById('title-div')
                         setTimeout(() => element.focus(), 0);
                         document.getSelection().collapseToEnd();
                     }
                     }
                     onBlur={() => {
                         setTitleEditable(false)
                         document.getElementById('title-div').scrollLeft=0
                         save()
                     }}
                     onKeyDown={event => {
                         if (event.key === 'Enter') {
                             document.getElementById('title-div').blur()
                         }
                     }}
                >
                    <h2 className='text-5xl font-medium text-center text-gray-900 grow' ref={nameRef}>
                        {name}
                    </h2>
                </div>
            </header>
            <hr className='h-0.5 bg-gray-300'/>
            <section className='bg-amber-100 p-1.5 rounded-b-lg h-full'>
                <div id='desc-div'
                     className='flex flex-col h-full overflow-y-auto focus:outline-0 focus:overflow-y-auto focus:px-1 transition-all'
                     contentEditable={isDescEditable} suppressContentEditableWarning={true}
                     onBlur={() => {
                         setDescEditable(false)
                         document.getElementById('desc-div').scrollTop=0
                         save()
                     }}
                     onClick={() => {
                         setDescEditable(true)
                         const element = document.getElementById('desc-div')
                         setTimeout(() => element.focus(), 0);
                     }
                     }
                >
                    <p className='text-justify text-gray-900'
                       ref={descRef}>
                        {description}
                    </p>
                </div>
            </section>
        </div>
    </>
}

export default CardInfo;