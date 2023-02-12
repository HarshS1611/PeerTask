import React from 'react'
import Router from 'next/router'

const GoBackbtn = () => {
    return (
        <button
            className="bg-sky-700 text-white font-bold text-xl rounded-lg px-1 py-1 mt-5 ml-10"
            onClick={() => Router.back()}
        >
            Go Back
        </button>
    )
}

export default GoBackbtn