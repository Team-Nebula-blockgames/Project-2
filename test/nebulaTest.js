const chai = require("chai");
const { expect, assert } = chai;
chai.use(require("chai-as-promised"));
const { ethers } = require("hardhat");

describe("Upbox Contract 💢", function () {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    let upboxFactory = await ethers.getContractFactory("Upbox");
    upboxContract = await upboxFactory.deploy();
    await upboxContract.deployed();
  });

  it("Should deploy contract and set owner", async function () {
    let upboxOwner = await upboxContract.owner();
    expect(upboxOwner, "Contract not deployed").equals(deployer.address);
  });

  it("User should be able to upload public files", async function () {
    //Arrange
    let metaData = JSON.stringify({ game: "name" });
    let isPrivate = false;
    let userOneUploads = 3;
    let userTwoUploads = 3;

    //Act
    for (let i = 0; i < userOneUploads; i++) {
      //loop for userOneUploads
      let uploadPublicTx = await upboxContract
        .connect(accounts[1])
        .uploadFile(metaData, isPrivate);
      await uploadPublicTx.wait();
    }
    for (let i = 0; i < userTwoUploads; i++) {
      //loop for userOTwoUploads
      let uploadPublicTx = await upboxContract
        .connect(accounts[2])
        .uploadFile(metaData, isPrivate);
      await uploadPublicTx.wait();
    }

    //Assert
    const allTokens = await upboxContract.getAllPublicTokens();
    assert.equal(
      allTokens.length,
      userOneUploads + userTwoUploads,
      "Could not upload a public file!"
    );
  });

  it("User should be able to upload private files", async function () {
    const uploadPrivateTx = await upboxContract.uploadFile("Hello world", true);
    await uploadPrivateTx.wait();

    const userTokens = await upboxContract.getMyPrivateTokens();
    assert.equal(userTokens, 1, "Could not upload a private file!");
    console.log("Uploading a private file...");
  });

  it("User should be able to share files", async function () {
    let metaData = JSON.stringify({ game: "name" });
    await upboxContract.uploadFile(metaData, false);
    const shareTx = await upboxContract.shareToken(accounts[1].address, 1);
    await shareTx.wait();

    const recieved = await upboxContract
      .connect(accounts[1])
      .getMyRecievedTokens();
    expect(Number(recieved)).to.equals(1);
    console.log("Sharing...");
  });

  it("Should return tokenUri of token", async () => {
    let metaData = JSON.stringify({ game: "name" }); // metadata input to uploadFile function
    /*
      The base64 encoded version of metadata {"game":"name"} gotten from https://www.browserling.com/tools/json-to-base64
      */
    let metaDataBase64 = "eyJnYW1lIjoibmFtZSJ9";
    await upboxContract.uploadFile(metaData, false); // call to uploadFile
    let tokenUri = await upboxContract.tokenURI(1); // call to get the just uploaded file metaData
    console.log("tokenUri:", tokenUri);
    expectedTokenUri = `data:application/json;base64,${metaDataBase64}`;
    expect(tokenUri).equal(expectedTokenUri);
  });

  it("Should return all public files in the library", async function () {
    const uploadPublicTx = await upboxContract.uploadFile(
      "Hello world!",
      false
    );
    await uploadPublicTx.wait();

    const file = await upboxContract.getAllPublicTokens();
    expect(Number(file)).to.equals(1, "Could not get all public tokens!");
    console.log("Getting all public files in the library...");
  });

  it("Should return all public files of a user", async function () {
    const uploadPublicTx = await upboxContract.uploadFile(
      "Hello world!",
      false
    );
    await uploadPublicTx.wait();

    const userTokens = await upboxContract.getMyPublicTokens();
    assert.equal(userTokens, 1, "Could not get public tokens of a user!");
    console.log("Getting all public files of a user...");
  });

  it("Should return all private files of a user", async function () {
    const uploadPrivateTx = await upboxContract.uploadFile(
      "Hello world!",
      true
    );
    await uploadPrivateTx.wait();

    const userTokens = await upboxContract.getMyPrivateTokens();
    assert.equal(userTokens, 1, "Could not get private files of a user!");
    console.log("Getting all private files of a user...");
  });

  it("Should return received tokens of a user", async function () {
    //Arrange
    let receiver = accounts[1];
    let metaData = JSON.stringify({ game: "name" });
    let isPrivate = false;
    let noOfFilesShared = 5;

    //Act
    for (let tokenId = 1; tokenId <= noOfFilesShared; tokenId++) {
      await upboxContract.uploadFile(metaData, isPrivate);
      const shareTx = await upboxContract.shareToken(receiver.address, tokenId);
      await shareTx.wait();
    }

    //Assert
    const received = await upboxContract
      .connect(receiver)
      .getMyRecievedTokens();
    expect(received.length).to.equals(
      noOfFilesShared,
      "Could not get recieved tokens!"
    );
  });
});
