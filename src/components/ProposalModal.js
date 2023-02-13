import React from 'react'

const ProposalModal = ({
    setModal,
    proposal,
    setProposal,
    motivation,
    setMotivation,
    bid,
    setBid,
    duration,
    setDuration,
    proposalDetails,
    setProposalDetails,
    handleSubmit,
}) => {
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-sm ">
            <div className="relative w-auto my-6 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[48rem] bg-[#1a1e27] outline-none focus:outline-none ">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font-semibold text-white">Submit Proposal</h3>
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setModal(false)}
                        >
                            <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">
                                x
                            </span>
                        </button>
                    </div>
                    <div className="relative p-3 flex-auto">
                        <form className="bg-transparent shadow-md rounded px-8 pt-3 pb-8 w-full">
                            <label className="block text-white text-sm font-semibold mb-1">
                                Motivation*
                            </label>
                            <textarea type="text" className="shadow appearance-none border rounded w-full text-white
                                            block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none "
                                required
                                value={motivation}
                                onChange={(e) => setMotivation(e.target.value)}
                            />

                            <label className="block text-white text-sm font-semibold mb-1">
                                Bid(ETH)*
                            </label>
                            <input type="number" className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                                value={bid}
                                onChange={(e) => setBid(e.target.value)}
                                required
                                min={0}
                                max={100}
                            />
                            <label className="block text-white text-sm font-semibold mb-1">
                                Duration(days)*
                            </label>
                            <input type="number" className="shadow appearance-none border rounded w-full text-white
                                       block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none
                                        transition transform duration-100 ease-out"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                                min={0}
                                max={10}
                            />
                            <label className="block text-white text-sm font-semibold">
                                Proposal*
                            </label>
                            <textarea
                                value={proposalDetails}
                                onChange={(e) => setProposalDetails(e.target.value)}

                                type="text"
                                id="description" className='
                                            shadow appearance-none border rounded w-full text-white
                                            block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none
                            transition transform duration-100 ease-out resize-none 
                            ' required />
                        </form>
                    </div>

                    <button
                        className="text-white bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                    // onClick={handleAddTask}
                    >
                        Save
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ProposalModal