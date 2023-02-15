import React from 'react';

const Button = (props) => (
    <button
        className="font-bold uppercase px-6 py-2 text-gray-700 text-sm rounded-lg hover:shadow-md ease-linear transition-all duration-150 hover:text-white hover:bg-black"
        {...props}
    >
        {props.children}
    </button>
);

export default Button;