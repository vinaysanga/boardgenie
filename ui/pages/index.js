import React from 'react';
import Card from "../components/Card";
import AddCard from "../components/AddCard";
import useSWR, {useSWRConfig} from "swr";
import {PacmanLoader} from "react-spinners";
import Head from "next/head";

const fetcher = async (url) => {
    const res = await fetch(url)
    return await res.json()
}

function Index() {
    const {data, error, isLoading} = useSWR('/api/getAllTasks', fetcher);
    const {mutate} = useSWRConfig()
    if (error) return (<div>Some error occurred while retrieving details for the task. Please check the logs</div>)
    if (isLoading) return (
        <PacmanLoader color="#abc234"/>
    )
    return (
        <>
            <Head>
                <title>Board-genie</title>
            </Head>
            <div className='flex flex-col p-10'>
                <div className='text-9xl text-center'>Welcome</div>
                <div className='grid grid-cols-6'>
                    <AddCard callback={mutate}/>
                    {data.map(task =>
                        <Card key={task.id} id={task.id} title={task.name} description={task.description}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Index;