import React from 'react';
import useSWR, {useSWRConfig} from "swr";
import AddCard from "../components/AddCard";
import Card from "../components/Card";
import Head from "next/head";
import Loader from "../components/Loader";

const fetcher = async (url) => {
    const res = await fetch(url)
    return await res.json()
}

function Index() {
    const {data, error, isLoading} = useSWR('/api/getAllTasks', fetcher);
    const {mutate} = useSWRConfig()
    if (error) return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-5'>
            <h2 className='text-lg font-bold'>Some error occurred while retrieving details for the task. Please check
                the logs</h2>
        </div>
    )
    if (isLoading) return <Loader/>
    return (
        <>
            <Head>
                <title>Board-genie</title>
            </Head>
            <div className='w-full p-10'>
                <header className='w-full justify-center fixed top-0 left-0 py-5 z-20 bg-slate-300 shadow-md rounded-b'>
                    <h2 className='text-9xl text-center text-gray-900'>Welcome</h2>
                </header>
                <main className='pt-32'>
                    <div className='grid grid-cols-5'>
                        <AddCard callback={mutate}/>
                        {data.map(task =>
                            <Card key={task.id} id={task.id} title={task.name} description={task.description}/>
                        )}
                    </div>
                    </main>
            </div>
        </>
    );
}

export default Index;