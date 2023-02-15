import React from 'react';
import {FadeLoader} from "react-spinners";

const Loader = () => (
    <div className='flex flex-col justify-center items-center min-h-screen space-y-5'>
        <FadeLoader
            size={240}/>
    </div>
);

export default Loader;