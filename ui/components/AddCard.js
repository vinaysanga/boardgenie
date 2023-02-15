import React, {useState} from 'react';
import AddTaskModal from "./AddTaskModal";
import {PlusIcon} from "@heroicons/react/24/solid";

function AddCard(props) {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false)
        document.body.classList.toggle('overflow-hidden')
    }
    return (
        <>
            <div
                className="flex items-center justify-center bg-amber-100 m-4 p-2 h-48 shadow-md rounded-lg
                hover:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)] hover:font-medium transform hover:scale-110 duration-100"
                onClick={() => {
                    setShowModal(true)
                    document.body.classList.toggle('overflow-hidden')
                }}>
                <PlusIcon className='w-24 h-32 fill-gray-900'/>
            </div>
            <AddTaskModal isVisible={showModal} closeModal={closeModal} callback={props.callback}/>
        </>
    );
}

export default AddCard;