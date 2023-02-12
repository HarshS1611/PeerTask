import Link from 'next/link'
import React from 'react'

const ProjectCard = () => {
    const id = 123123123123
    return (
        <Link href={`/viewproject/${id}`}>
            <div className="flex py-7 px-3 border-2 border-slate-700 rounded-xl m-5 cursor-pointer hover:opacity-80 hover:shadow-lg hover:bg-zinc-700 pr-4 transition duration-500 ease-in hover:border-none">
                {/* Just for image div-LHS */}
                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                    Some img
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
                        <p className="flex items-center">
                            {/* <StarIcon className="h-5 text-red-400" /> */}
                            star
                        </p>
                        <div>
                            <p className="text-lg lg:text-2xl font-semibold pb-2">price</p>
                            <p className="text-right font-extralight">total</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard