import Link from 'next/link';
import React from 'react'

const TaskCard = ({
    task,
    id
}) => {
    console.log(task);
    // go to the uri of each task and fetch the details
    // task.uri = JSON.parse(task.uri);
    // console.log(task.uri);
    return (


        <tbody className="divide-y divide-gray-200 text-white">
            <tr>
                <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap">
                    {
                        task.Id
                    }
                </td>
                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                    {
                        task.taskName
                    }
                </td>
                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                    {
                        task.proposalCount
                    }
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    {
                        task.taskDuration
                    }
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    {
                        task.taskStatus
                    }
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link href={`viewtask/${id}/${task.Id}`}>
                        <button
                            className='
                        bg-[#0284c7]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        hover:bg-[#0284c7]
                        hover:text-white
                        hover:font-semibold
                        hover:rounded-xl
                        hover:px-4
                        hover:py-2
                        '
                        >
                            View more
                        </button>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

export default TaskCard