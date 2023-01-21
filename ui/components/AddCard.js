import React, {useState} from 'react';
import AddTaskModal from "./AddTaskModal";

function AddCard(props) {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <div
                className="flex items-center justify-center bg-white m-4 h-48 shadow-md rounded-lg rounded-lg bg-yellow-50 hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.3)] hover:border-opacity-0 transform hover:scale-110 duration-100"
                onClick={()=>setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0}
                         stroke="#9ca3af" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
            </div>
            <AddTaskModal isVisible={showModal} closeModal={closeModal} callback = {props.callback}/>
        </>
    );
}

export default AddCard;