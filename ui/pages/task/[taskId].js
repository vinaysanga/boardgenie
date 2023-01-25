import React from 'react';
import {useRouter} from "next/router";
import useSWR, {useSWRConfig} from "swr";
import {PacmanLoader} from "react-spinners";
import CardInfo from "../../components/CardInfo";

const fetchTask = async (url) => {
    const res = await fetch(url, {cache: 'no-cache'})
    return await res.json()
}

const removeTask = async (id) => {
    const res = (await fetch('/api/deleteTaskById?id=' + id,
        {
            method: 'DELETE'
        }))
    return await res.text()
}
const Task = () => {
    const query = useRouter().query
    const {data, error, isLoading} = useSWR('/api/getTask?id=' + query['taskId'], fetchTask)
    const {mutate} = useSWRConfig()
    if (error) return (<div>Some error occurred while retrieving details for the task. Please check the logs</div>)
    if (isLoading) return (
        <PacmanLoader color="#abc234"/>
    )
    return (
        <>
            <CardInfo id={data.id} name={data.name} description={data.description} removeTask={removeTask}
                      mutate={mutate}/>
        </>
    )
}

export default Task;
