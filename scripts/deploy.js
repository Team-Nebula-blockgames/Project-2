const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployers account:", deployer.address);
  console.log(
    "Deployers account balance:",
    (await deployer.getBalance()).toString()
  );

  const Upbox = await ethers.getContractFactory("Upbox");
  const upbox = await Upbox.deploy();
  console.log("Nebula Upbox contract addresss:", upbox.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
