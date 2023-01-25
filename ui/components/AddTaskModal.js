import React, {useRef} from 'react';

function AddTaskModal({isVisible, closeModal, callback}) {
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const save = async (event) => {
        event.preventDefault();
        const task = {
            name: nameRef.current.value,
            description: descRef.current.value
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
        callback('/api/getAllTasks')
        closeModal()
    }
    return (
        <>
            {isVisible && (
                <>
                    <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between space-x-4 p-8">
                                    <h3 className="text-3xl font-bold">
                                        Whadda' ya wanna do mate?
                                    </h3>
                                    <button
                                        className="p-1 float-right leading-none font-light hover:bg-gray-300 font-bold hover:rounded-md transform hover:duration-200"
                                        onClick={closeModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-8 py-4 space-y-8 flex-auto">
                                    <input type="text" id="task-name" ref={nameRef}
                                           className="rounded-lg p-2 w-full text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-gray-200 focus:bg-gray-50 focus:ring-0"
                                           placeholder="Task name"/>
                                    <textarea id='task-description' ref={descRef}
                                              className="rounded-lg p-2 w-full h-48 text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-gray-200 focus:bg-gray-50 overflow-visible"
                                              placeholder="Description"/>
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 space-x-4">
                                    <button
                                        className=" font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md ease-linear transition-all duration-150 hover:text-white hover:bg-black"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md ease-linear transition-all duration-150 hover:text-white hover:bg-black"
                                        type="submit"
                                        onClick={save}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}

export default AddTaskModal;