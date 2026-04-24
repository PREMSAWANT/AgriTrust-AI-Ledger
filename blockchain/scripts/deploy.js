const hre = require("hardhat");

async function main() {
  console.log("Deploying AgriTrust contract...");

  const AgriTrust = await hre.ethers.getContractFactory("AgriTrust");
  const agriTrust = await AgriTrust.deploy();

  await agriTrust.waitForDeployment();

  const address = await agriTrust.getAddress();

  console.log(`AgriTrust deployed to: ${address}`);
  
  // Optional: Verify contract on Etherscan if on Sepolia
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
