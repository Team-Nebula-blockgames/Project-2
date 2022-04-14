const chai = require("chai");
const { expect, assert } = chai;
chai.use(require("chai-as-promised"));
const { ethers } = require("hardhat");

describe("NebulaNFT Contract 💢", function () {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    let nebulaFactory = await ethers.getContractFactory("Nebula");
    nebulaContract = await nebulaFactory.deploy();
    await nebulaContract.deployed();
  });

  it("Should deploy contract and set owner", async function () {
    let nebulaOwner = await nebulaContract.owner();
    expect(nebulaOwner, "nestcoin contract not deployed").equals(
      deployer.address
    );
  });

  it("Should return tokenUri of token", async () => {
    let metaData = JSON.stringify({ game: "name" }); // metadata input to uploadFile function
    /*
    The base64 encoded version of metadata {"game":"name"} gotten from https://www.browserling.com/tools/json-to-base64
    */
    let metaDataBase64 = "eyJnYW1lIjoibmFtZSJ9";
    await nebulaContract.uploadFile(metaData, false); // call to uploadFile
    let tokenUri = await nebulaContract.tokenURI(1); // call to get the just uploaded file metaData
    console.log("tokenUri:", tokenUri);
    expectedTokenUri = `data:application/json;base64,${metaDataBase64}`;
    expect(tokenUri).equal(expectedTokenUri);
  });
});
