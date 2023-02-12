import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const MyProjectCard = () => {
    const id = 123123123123
    return (

        <div className="flex py-7 px-3 border-2 border-slate-700 rounded-xl m-5 hover:opacity-90 hover:shadow-lg pr-4 transition duration-500 ease-in">
            {/* Just for image div-LHS */}
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image src="https://links.papareact.com/3pn" layout="fill" objectFit="cover" />
            </div>
            {/* Content div-RHS */}
            <div className='flex flex-col flex-grow pl-5'>
                <div className='flex justify-between'>
                    <p>location</p>
                    {/* <HeartIcon className="h-7 cursor-pointer" /> */}
                </div>
                <h4 className="text-xl">title</h4>
                <div className="border-b w-10 pt-2" />
                <p className="pt-2 text-sm text-gray-500 flex-grow">description</p>

                {/* Price div */}
                <div className="flex justify-between items-end pt-5">
                    {/* Buttons to edit project and view project */}
                    <div className="flex space-x-4 items-center justify-end text-gray-500">
                        <Link href={`/project/${id}`}>
                            <button className="hidden md:inline-flex bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl
                            hover:bg-white hover:text-black
                            ">Edit Project</button>
                        </Link>
                        <Link href={`/viewproject/${id}`}>
                            <button className="hidden md:inline-flex bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl
                            hover:bg-white hover:text-black
                            ">View Project</button>
                        </Link>
                    </div>
                    <div>
                        <p className="text-lg lg:text-2xl font-semibold pb-2">price</p>
                        <p className="text-right font-extralight">total</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MyProjectCard