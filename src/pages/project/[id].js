import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Head from "next/head"
import Modal from '@/components/Modal'
import GoBackbtn from '@/components/GoBackbtn'

const ProjectInfo = () => {
    const router = useRouter()
    const { id } = router.query
    // const [task, setTask] = useState([{ price: "", task_name: "" }]);
    const [modalOpen, setModalOpen] = useState(false);
    const [tasksData, setTasksData] = useState(
        {
            taskName: "",
            taskDescription: "",
            stakedAmount: "",
            taskDuration: "",
        }
    )

    const handleDeleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(tasks);

    };
    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {/* A button to go back to the previous page */}
            <GoBackbtn />
            <section className="bg-black text-white pb-6 px-10">
                <h1 className="text-2xl font-bold my-2 md:ml-2">Project Info</h1>
                <div className='bg-[#1a1e27] rounded-xl p-5 mt-5'>
                    <div className='flex flex-col md:flex-row my-2'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Name:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Project name
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-2'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Description:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quos ullam, architecto maxime repellendus id corporis? Veritatis natus quia repellendus?
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-2'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Category:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Defi
                        </p>

                    </div>
                    <div className='flex flex-col md:flex-row my-2'>

                        <h3 className="text-lg font-semibold md:ml-2">
                            Skills:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Solidity, React, Next.js
                        </p>
                    </div>
                </div>

                {/* Button to add tasks in the project */}
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-[#0284c7] text-white text-lg px-5 py-2 rounded-xl mt-5">Add Task</button>
                {modalOpen && (
                    <Modal
                        setModalOpen={setModalOpen}
                        tasksData={tasksData}
                        setTasksData={setTasksData}
                        handleSubmit={handleSubmit}
                        id={id}
                    // handleAddTask={handleAddTask}
                    />

                )}
                <table className="table-auto w-full text-left mt-8">
                    <thead className="bg-[#1a1e27]">
                        <tr className="bg-[#0284c7] text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                            <th className="p-4">Task Name</th>
                            <th className="p-4">Task Description</th>
                            <th className="p-4">Task Price</th>
                            <th className="p-4">Task Duration</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    {/* <tbody className="bg-[#1a1e27]">
                        {tasksData.map((task, index) => (
                            <tr key={index} className="text-sm text-white m-20">
                                <td className="p-4">{task.name}</td>
                                <td className="p-4">{task.description}</td>
                                <td className="p-4">{task.price}</td>
                                <td className="p-4">{task.duration}</td>
                                <td className="p-4">
                                    <button className="bg-[#0284c7] text-white text-lg px-3 py-2 rounded-xl mt-1" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </section>
        </>
    )
}

export default ProjectInfo