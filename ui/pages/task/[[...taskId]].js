import React from 'react';
import useSWR, {useSWRConfig} from 'swr'
import {router} from "next/client";
import {PacmanLoader} from "react-spinners";

const fetcher = async (url) => {
    const res = await fetch(url)
    return await res.json()
}

const Task = () => {
    const query = router.query
    const {data, error, isLoading} = useSWR('http://localhost:8080/api/getTask?id=' + query['taskId'], fetcher)
    const {mutate} = useSWRConfig()
    if (error) return (<div>Some error occurred while retrieving details for the task. Please check the logs</div>)
    if (isLoading) return (
        <PacmanLoader color="#abc234"/>
    )
    const removeTask = async (id) =>{
        const res = (await fetch('http://localhost:8080/api/deleteTaskById?id=' + id,
            {
                method: 'DELETE'
            }))
        return mutate('http://localhost:8080/api/getAllTasks')
    }
    return (
        <>
            {data.id}<br/>
            {data.name}<br/>
            {data.description}<br/>
            <button onClick={() =>{
                removeTask(data.id).then()
                router.back()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
            </button>
        </>
    );
};

export default Task;

