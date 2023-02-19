import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Web3Modal from "web3modal";
import { contractAddress } from "../../../../../blockchain/config";
import JobPortal from "../../../../../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json";
import { ethers } from "ethers";
import Head from "next/head";
import ProposalModal from "@/components/ProposalModal";
import TaskSubmitModal from "@/components/TaskSubmitModal";
import axios from "axios";

export default function TaskInfo() {
    const [modal, setModal] = useState(false);
    const [taskModal, setTaskModal] = useState(false);
    const router = useRouter();
    const { asPath } = useRouter();
    const [taskDisplayDetails, setDisplayTaskDetails] = useState([]);
    // console.log(asPath);
    let projectId = asPath.split("/")[3];
    // console.log(projectId);
    let taskId = asPath.split("/")[4];
    // console.log(taskId);
    const [proposalView, setProposalView] = useState([]);
    const [isAddress, setIsAddress] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [onGoing, setOnGoing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);

    useEffect(() => {
        async function getTask() {
            console.log("tasks");
            // const web3Modal = new Web3Modal();
            // const connection = await web3Modal.connect();
            // const provider = new ethers.providers.Web3Provider(connection);
            // const signer = provider.getSigner();
            const provider = new ethers.providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1')
            const jobPortal = new ethers.Contract(
                contractAddress,
                JobPortal.abi,
                provider
            );
            const task = await jobPortal.getTaskData(projectId, taskId);
            console.log("task" + JSON.stringify(task));
            await setIsCompleted(task[5]);
            await setIsReviewed(task[6]);

            const meta = await axios.get(task[0]);
            // console.log(meta.data);
            // convert the array to object
            const taskObj = {
                uri: task[0],
                Id: task[1].toNumber(),
                stakedAmount: task[2].toNumber(),
                proposalCount: task[3].toNumber(),
                worker: task[4],
                isComplete: task[5],
                isReviewed: task[6],
                onGoing: task[7],
                taskName: meta.data.taskName,
                taskDescription: meta.data.taskDescription,
                taskDuration: meta.data.taskDuration,
            };
            // console.log(taskObj);
            setDisplayTaskDetails(taskObj);
        }
        getTask();
        async function getProposals() {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const jobPortal = new ethers.Contract(
                contractAddress,
                JobPortal.abi,
                signer
            );
            const proposalDetails = await jobPortal.getProposalsByTaskId(
                projectId,
                taskId
            );
            console.log(proposalDetails);
            console.log("myaddress" + typeof signer.getAddress());
            if (proposalDetails.length === 0) {
                return;
            }
            console.log("proposalDetails" + proposalDetails);

            for (let i = 0; i < proposalDetails.length; i++) {
                console.log(proposalDetails[i][3]);
                console.log(await signer.getAddress());
                if (proposalDetails[i][3] == (await signer.getAddress())) {
                    await setIsWaiting(proposalDetails[i][0]);
                    await setOnGoing(proposalDetails[i][1]);
                    await setIsAddress(true);
                    setProposalView(proposalDetails[i][3]);
                }
            }

            // const data = await Promise.all(
            //   proposalDetails.map(async (proposals) => {
            //     console.log("proposals" + proposals);
            //     if (proposals[3] == (await signer.getAddress())) {
            //       await setIsWaiting(proposals[0]);
            //       await setOnGoing(proposals[1]);

            //       await setIsAddress(true);
            //       const meta = await axios.get(proposals[2]);
            //       // console.log(meta.data);
            //       // // convert the array to object
            //       const proposalObj = {
            //         uri: proposals[2],
            //         worker: proposals[3],
            //         bid: proposals[4].toNumber(),
            //         motivation: meta.data.motivation,
            //         proposalDescription: meta.data.proposalDetails,
            //       };
            //       return proposalObj;
            //     }
            //   })
            // );
            // console.log("proposal data" + data);
            // // console.log(isAddress);
            // setProposalView(data);
            // // console.log(proposalView);
        }
        getProposals();
    }, []);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(proposal);
    // };
    // console.log(isAddress);
    console.log("proposalview" + typeof proposalView);
    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <section className="bg-black text-white pb-6 px-10">
                <h1 className="text-2xl font-bold my-2 md:ml-2">Project Details</h1>
                <p className="text-sm md:ml-2 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
                    atque ea aut error aliquam, molestiae ipsum perspiciatis
                    exercitationem quisquam! Ducimus cupiditate dolore voluptates
                    assumenda accusantium!
                </p>
                <div className="py-7 h-96 w-9/12 border-2 border-slate-700 rounded-xl my-8 px-5">
                    <div className="flex flex-col md:flex-row my-4">
                        <h3 className="text-lg font-semibold md:ml-2">Task Name:</h3>

                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.taskName}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row my-4">
                        <h3 className="text-lg font-semibold md:ml-2">Description:</h3>

                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.taskDescription}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row my-4">
                        <h3 className="text-lg font-semibold md:ml-2">Category:</h3>

                        <span
                            className="
                            text-sm
                            md:ml-3
                            bg-slate-700
                            rounded-xl
                            px-2
                            py-1
                            text-white
                            font-semibold
                            
                        "
                        >
                            UI/UX
                        </span>
                        <span
                            className="
                            text-sm
                            md:ml-2
                            bg-slate-700
                            rounded-xl
                            px-2
                            py-1
                            text-white
                            font-semibold
                            
                        "
                        >
                            Web Development
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row my-4">
                        <h3 className="text-lg font-semibold md:ml-2">Reward:</h3>

                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.stakedAmount}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row my-4">
                        <h3 className="text-lg font-semibold md:ml-2">Duration:</h3>
                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.taskDuration}
                        </p>
                    </div>
                    {/* If the user's wallet address matches the worker address, then show the submit task button else show in progress */}
                    {/* {JSON.stringify(proposalView)} */}
                    {proposalView.length == 0 && (
                        <button
                            onClick={() => setModal(true)}
                            className="
                          bg-[#0284c7]
                          text-white
                          font-semibold
                          rounded-xl
                          px-4
                          py-2
                          mt-4
                          md:ml-2
                      "
                        >
                            Submit Proposal
                        </button>
                    )}

                    {isWaiting && (
                        <h1 className="mt-10">
                            <span
                                className="
                        bg-yellow-500
                        text-black
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-10
                        md:ml-2
                    "
                            >
                                Waiting
                            </span>
                        </h1>
                    )}
                    {onGoing && (
                        <button
                            onClick={() => setTaskModal(true)} // a different modal for submitting task
                            className="
                        bg-[#0b3044]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-4
                        md:ml-2
                    "
                        >
                            Submit Task
                        </button>
                    )}
                    {isCompleted && (
                        <h1 className="mt-10">
                            <span
                                className="
                        bg-green-700
                        text-black
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-10
                        md:ml-2
                    "
                            >
                                Completed, Waiting for review
                            </span>
                        </h1>
                    )}
                    {isReviewed && (
                        <h1 className="mt-10">
                            <span
                                className="
                        bg-green-300
                        text-black
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-10
                        md:ml-2
                    "
                            >
                                Completed Task
                            </span>
                        </h1>
                    )}
                    {modal && <ProposalModal setModal={setModal} />}
                    {taskModal && <TaskSubmitModal setTaskModal={setTaskModal}
                        projectId={projectId}
                        taskId={taskId}
                    />}
                    {/* <button
                        onClick={() => setTaskModal(true)}
                        className='
                        bg-[#0284c7]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-4
                        md:ml-2
                    '>
                        Submit task
                    </button>
                    {
                        taskModal && <TaskSubmitModal setTaskModal={setTaskModal} />
                    } */}
                </div>
            </section>
        </>
    );
}
