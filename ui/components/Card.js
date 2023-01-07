import React from 'react';
import Link from "next/link";

const Card = (props) => (

        <Link href={`/task/${props.id}`} className="cursor-default">
        <div className="m-4 p-2 h-48 shadow-md rounded-lg hover:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)]
            hover:font-medium transform hover:scale-110 duration-100 overflow-clip">
            <h2 className="text-lg mb-2">{props.title}</h2>
            <hr/>
            <p className="font-light font-mono text-sm text-gray-700">{props.description}</p>
        </div>
    </Link>
);

export default Card;