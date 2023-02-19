import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ project }) {

    console.log(project.image)
    console.log(project)

    return (
        <Link href={`/viewproject/${project.id}`}>
            <div className="flex py-7 px-3 border-2 border-slate-700 rounded-xl m-5 cursor-pointer hover:opacity-80 hover:shadow-lg hover:bg-zinc-700 pr-4 transition duration-500 ease-in hover:border-none">
                {/* Just for image div-LHS */}
                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                    <Image src={project.image} alt="img" layout="fill" objectFit="cover" className="rounded-2xl" />
                </div>
                {/* Content div-RHS */}
                <div className='flex flex-col flex-grow pl-5'>
                    <h4 className="text-2xl">{project.title}</h4>
                    <div className="border-b w-10 pt-2" />
                    <p className="pt-2 text-lg text-white flex-grow">{project.description}</p>

                    {/* Price div */}
                    <div className="flex justify-between items-end pt-5">
                        <p className="flex items-center border-2 rounded-xl bg-slate-700 p-2">
                            {/* <StarIcon className="h-5 text-red-400" /> */}
                            {
                                project.category
                            }
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
