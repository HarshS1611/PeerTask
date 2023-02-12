import React, { useState } from "react";

const Tasks = ({ task, index, handleChange, handleDelete }) => (
    <>
        <div className='flex relative m-0'>
            <input type="number" placeholder="Price(in Eth)"
                value={task.price}
                min={0}
                max={100}
                onChange={(e) => handleChange(e, index, "price")}
                id="username" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
            <input type="text" placeholder="Task Name"
                value={task.task_name}
                onChange={(e) => handleChange(e, index, "task_name")}
                id="username" className='block h-12 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-5 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out
                            ' required />
            <button className='bg-sky-700 px-3 py-1 h-[50px] mt-5 mb-2 rounded-lg text-white' onClick={() => handleDelete(index)}>Delete</button>
        </div>
    </>

);

export default Tasks;