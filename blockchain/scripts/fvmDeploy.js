// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

require("dotenv").config();

require("hardhat-deploy")
require("hardhat-deploy-ethers")
const { API_URL, PRIVATE_KEY } = process.env;

const ethers = require("ethers")
const fa = require("@glif/filecoin-address")
const util = require("util")
const request = util.promisify(require("request"))



function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))
    return new Uint8Array(bytes)
}

async function callRpc(method, params) {
    var options = {
        method: "POST",
        url: "https://wallaby.node.glif.io/rpc/v0",
        // url: "http://localhost:1234/rpc/v0",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
        }),
    }
    const res = await request(options)
    return JSON.parse(res.body).result
}

const deployer = new ethers.Wallet(PRIVATE_KEY)

console.info(deployer.publicKey)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    const f4Address = fa.newDelegatedEthAddress(deployer.address).toString()
    const nonce = await callRpc("Filecoin.MpoolGetNonce", [f4Address])

    console.log("Wallet Ethereum Address:", deployer.address)
    console.log("Wallet f4Address: ", f4Address)

    const result = await deploy("JobPortal", {
        from: deployer.address,
        args: [],
        // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
        // a large gasLimit. This should be addressed in the following releases.
        gasLimit: 1000000000, // BlockGasLimit / 10
        // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    const provider = new ethers.providers.JsonRpcProvider(
        "https://wallaby.node.glif.io/rpc/v0",
        31415
    )
    const contract = await ethers.ContractFactory.getContract(result.address, result.abi, provider)
    console.info(await contract.getAddress())


}

module.exports.tags = ["JobPortal"]