import React from 'react';
import useSWR from 'swr'
import {router} from "next/client";
import {PacmanLoader} from "react-spinners";
const fetcher = async (url) =>{
    const res = await fetch(url)
    return await res.json()
}

const Task = (props) => {
    const query = router.query
    const {data, error, isLoading} = useSWR('http://localhost:8080/api/getTask?id='+query['taskId'], fetcher)
    if(error) return (<div>Some error occurred while retrieving details for the task. Please check the logs</div>)
    if(isLoading) return (
        <PacmanLoader color="#abc234"/>
    )
    return (
        <>
            {data.description}<br/>
            <button onClick={() => router.back()}>Go Back</button>
        </>
    );
};

export default Task;

