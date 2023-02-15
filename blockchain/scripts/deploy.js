// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const JobPortal = await hre.ethers.getContractFactory("JobPortal");
<<<<<<< HEAD:blockchain/scripts/deploy.js

  const jobPortal = await JobPortal.deploy();

  await jobPortal.deployed();

  fs.writeFileSync(
    "./config.js",
    `export const contractAddress = "${jobPortal.address}";`
=======
  //const test = await hre.ethers.getContractFactory("TaskBidding");

  const jobPortal = await JobPortal.deploy();
  //const testContract = await test.deploy();

  await jobPortal.deployed();
 // await testContract.deployed();

  fs.writeFileSync(
    "./config.js",
    `export const contractAddress = "${jobPortal.address}";
    `
>>>>>>> e9dd5b70b71c6c83341fe1de74f7de80d9a58465:src/blockchain/scripts/deploy.js
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
