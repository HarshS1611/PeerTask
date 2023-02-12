import Header from '@/components/Header'
import { useState } from 'react'
import Head from 'next/head'
import { create as ipfsClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../blockchain/config";
import JobPortal from "../blockchain/artifacts/contracts/Test.sol/TaskBidding.json";
// import { Web3Storage } from 'web3.storage'

const projectId = '2LdCDYA3OWJzTWs1x774mhFTh5o'
const projectSecret = '0f7c710c31dc3c142dfbb92778ad941d'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth
    }
})

export default function CreateProject() {
    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        category: '',
        skills: '',
        image: '',
        duration: '',
        // status: '',
        // owner: '',
        // freelancer: '',
        // createdAt: '',
        // updatedAt: '',
    })

    // async function uplaodDataToWeb3Storage(data) {
    //     console.log(data)
    //     const client = new Web3Storage({ token: process.env.WEB3STORAGE_API_KEY })
    //     const cid = await client.put(data)
    //     console.log(cid)
    //     return cid
    // }

    async function uploadToIPFS(Jdata) {
        const data = JSON.stringify(Jdata)
        const { cid } = await client.add(data)
        console.log(cid)
        return cid
    }

    async function createProject() {
        const { title, description, category, skills, image, duration } = projectData
        if (!title || !description || !category || !skills || !image || !duration) return
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();


            const jobPortal = new ethers.Contract(contractAddress, JobPortal.abi, signer);
            const dataCid = await uploadToIPFS(projectData);
            const tx = await jobPortal.createProject(dataCid);
            await tx.wait();
            console.log("Project created!");
        } catch (err) {
            console.log("Error: ", err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(projectData)
        createProject()
    }

    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div
                className='flex flex-col items-center 
                justify-center'
            >
                <form className='bg-[#1a1e27] w-8/12 h-fit rounded-xl p-5 mt-3' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-white text-2xl text-center'>Register with Us!</h2>
                    <div className='flex relative m-0'>
                        <input type="text" placeholder="Title"
                            value={projectData.title}
                            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                            id="username" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <textarea type="text" placeholder="Description"
                            value={projectData.description}
                            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                            id="description" className='block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none 
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <select type="text" placeholder="Category"
                            value={projectData.category}
                            onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                            id="category" className='block bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-3 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required >
                            <option value=""
                                className='bg-[#080020] p-5 m-8 text-white'
                            >Select Category</option>
                            <option value="DeFi"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >DeFi</option>
                            <option value="NFTs"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >NFTs</option>
                            <option value="DAOs"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >DAOs</option>
                            <option value="AI/ML"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >AI/ML</option>
                            <option value="Cloud Computing"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >Cloud Computing</option>
                        </select>
                    </div>
                    <div className='flex relative m-0'>
                        <input type="text" placeholder="Skills"
                            value={projectData.skills}
                            onChange={(e) => setProjectData({ ...projectData, skills: e.target.value })}
                            id="skills" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <input type="file" placeholder="Image"
                            value={projectData.image}
                            onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
                            id="image" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 py-3 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
                    </div>
                    <div className='flex relative m-0'>
                        <select type="text" placeholder="Duration"
                            value={projectData.duration}
                            onChange={(e) => setProjectData({ ...projectData, duration: e.target.value })}
                            id="duration" className='block bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-3 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required >
                            <option value="">
                                Select Duration
                            </option>
                            <option value="1 Week"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >1 Week</option>
                            <option value="2 Weeks"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >2 Weeks</option>
                            <option value="3 Weeks"
                                className='bg-[#080020] p-5 m-8 text-white'
                            >3 Weeks</option>
                        </select>
                    </div>

                    {/* Button to submit the form */}
                    <div className='flex align-center justify-center'>
                        <button type="submit" className='block bg-sky-700 text-white text-lg font-bold rounded-xl px-2 py-3 mt-5 mb-2 mr-10 w-full focus:outline-none transition transform duration-100 ease-out' >Submit</button>
                    </div>


                </form>
            </div>

        </>

    )
}