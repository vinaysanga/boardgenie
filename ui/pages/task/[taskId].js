import React from 'react';
import {useRouter} from "next/router";
import useSWR, {useSWRConfig} from "swr";
import CardInfo from "../../components/CardInfo";
import Loader from "../../components/Loader";
import Head from "next/head";

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
    if (error) return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-5'>
            <h2 className='text-lg font-bold'>
                Some error occurred while retrieving details for the task. Please check the logs
            </h2>
        </div>
    )
    if (isLoading) return <Loader/>
    return (
        <>
            <Head>
                <title>Board-genie</title>
            </Head>
            <CardInfo id={data.id} name={data.name} description={data.description} removeTask={removeTask}
                      mutate={mutate}/>
        </>
    )
}

export default Task;
