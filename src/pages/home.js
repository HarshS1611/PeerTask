import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { AuthProvider, CHAIN } from "@arcana/auth";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../../blockchain/config";
import JobPortal from '../../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json'
import axios from 'axios';


export default function Home() {
    // On screen load get projects count
    const [projectsData, setProjectsData] = useState([]);

    useEffect(() => {
        async function getProjects() {
            let projectsArr = [];
            const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')

            //   await authArcana.init();
            //   const arcprovider = authArcana.provider;
            //   const arcanaProvider = await authArcana.loginWithSocial("google");
            //   const aprovider = new ethers.providers.Web3Provider(arcanaProvider);
            //   const asigner = aprovider.getSigner();
            //   const info = await authArcana.getUser(); 

            const jobPortal = new ethers.Contract(
                contractAddress,
                JobPortal.abi,
                provider
            );
            const cnt = await jobPortal.getCurrentProjectId();
            for (let i = 0; i <= cnt.toNumber(); i++) {
                projectsArr.push(i);
            }

            const data = await Promise.all(
                projectsArr.map(async (p) => {
                    const project = await jobPortal.projects(p);
                    const meta = await axios.get(project[0]);
                    // console.log(meta)
                    // convert the array to object
                    const projectObj = {
                        uri: project[0],
                        id: project[1].toNumber(),
                        manager: project[2],
                        taskCount: project[3].toNumber(),
                        title: meta.data.title,
                        skills: meta.data.skills,
                        image: meta.data.image,
                        duration: meta.data.duration,
                        description: meta.data.description,
                        category: meta.data.category,
                    };
                    return projectObj;
                })
            );
            setProjectsData(data);
            // console.log(data)
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
                    <h1 className="text-2xl font-semibold my-10 md:ml-5">
                        Explore Projects
                    </h1>
                    {/* run loop from 0 to project count and get project details */}
                    {/* {projectsData.length ? <p>{JSON.stringify(projectsData[0][2])}</p> : <p>loading</p>} */}
                    {/* {JSON.stringify(projectsData[0][1].toNumber())} */}

                    {projectsData.map((p, index) => (
                        <ProjectCard key={index} project={p} />
                    ))}
                </div>
            </section>
        </>
    );
}
