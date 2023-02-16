import React from 'react'
import Image from 'next/image'

function ProposalCard() {
    return (
        <div className="my-10 mx-8 roomcard border-2 border-slate-700 rounded-xl">
            <div className="rounded overflow-hidden h-full">
                <div style={{
                    display: "flex", alignContent: "center", justifyContent: "center",
                    borderRadius: "100px",
                    overflow: 'hidden',
                    width: '200px', height: '200px'
                    , margin: 'auto'
                }}>
                    <Image src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqu39eyj7mkHZ2gnUmKmU9smZN8F3mI7xeC2DFXhTWwOSiL7JaliiMiC8NF3hZK-m1AD8&usqp=CAU"
                    }
                        width={200}
                        height={200}
                        alt='sample'
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="flex">
                        <h1 className="text-white mb-2 px-2 font-bold text-lg">
                            Motivation:
                        </h1>

                        <span className="text-white pt-1">
                            Name
                        </span>
                    </div>
                    <div className="flex">
                        <h1 className="text-white mb-2 px-2 font-bold text-lg">
                            Description:
                        </h1>

                        <span className="text-white pt-1">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, error?
                        </span>
                    </div>
                    <div className="flex justify-items-center">
                        <h1 className="text-white mb-2 px-2 font-bold text-lg">
                            Price:
                        </h1>

                        <span className="text-white pt-1 mx-14">
                            0.0001 ETH
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <button className="bg-[#0284c7] text-white font-bold mx-5 mb-5 button px-5 py-2 rounded-xl">
                        Approve
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProposalCard