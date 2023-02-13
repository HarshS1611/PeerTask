import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../blockchain/config";
import JobPortal from '../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json'


export default function Home() {

    // On screen load get projects count
    const [projectsData, setProjectsData] = useState([]);

    useEffect(() => {
        async function getProjects() {
            let projectsArr = [];
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const jobPortal = new ethers.Contract(contractAddress, JobPortal.abi, signer);
            const cnt = await jobPortal.getCurrentProjectId();
            // console.log("Project count: ", cnt.toNumber());
            // let proj = await jobPortal.projects(0);
            // console.log(proj.taskCount.toNumber()
            // )
            // setProjects([...projects, proj]);
            // proj = await jobPortal.projects(1);
            // setProjects([...projects, proj]);
            // proj = await jobPortal.projects(2);
            // setProjects([...projects, proj]);
            for (let i = 0; i < cnt.toNumber(); i++) {
                projectsArr.push(i);
            }

            const data = await Promise.all(projectsArr.map(async (p) => {
                return await jobPortal.projects(p);
            }))
            console.log(data[0].taskCount.toNumber());
            console.log(data)
            setProjectsData(data);
            console.log(projectsData)
        }
        getProjects();

    }, []);



    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <section className="bg-black text-white pb-10 px-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-semibold my-10 md:ml-5">Explore Projects</h1>
                    {/* run loop from 0 to project count and get project details */}
                    {projectsData.length ? <p>{JSON.stringify(projectsData[0][2])}</p> : <p>loading</p>}
                    {/* {JSON.stringify(projectsData[0][1].toNumber())} */}

                    {projectsData.map((p, index) => (
                        <ProjectCard key={index} project={p} />
                    ))}

                </div>
            </section>
        </>
    )
}
