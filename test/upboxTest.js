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
  });

  it("Should return tokenUri of token", async () => {
    //Arrange
    let metaData = JSON.stringify({ game: "name" }); // metadata input to uploadFile function
    let mintedTokenId = 1;
    let metaDataBase64 = "eyJnYW1lIjoibmFtZSJ9"; //The base64 encoded version of metadata {"game":"name"} gotten from https://www.browserling.com/tools/json-to-base64
    expectedTokenUri = `data:application/json;base64,${metaDataBase64}`;

    //Act
    await upboxContract.uploadFile(metaData, false); // call to uploadFile
    let tokenUri = await upboxContract.tokenURI(mintedTokenId); // call to get the just uploaded file metaData

    //Assert
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
  });

  it("Should return all public files of a user", async function () {
    const uploadPublicTx = await upboxContract.uploadFile(
      "Hello world!",
      false
    );
    await uploadPublicTx.wait();

    const userTokens = await upboxContract.getMyPublicTokens();
    assert.equal(userTokens, 1, "Could not get public tokens of a user!");
  });

  it("Should return all private files of a user", async function () {
    const uploadPrivateTx = await upboxContract.uploadFile(
      "Hello world!",
      true
    );
    await uploadPrivateTx.wait();

    const userTokens = await upboxContract.getMyPrivateTokens();
    assert.equal(userTokens, 1, "Could not get private files of a user!");
  });

  it("Should return received tokens of a user", async function () {
    //Arrange
    let receiver = accounts[1];
    let metaData = JSON.stringify({ game: "name" });
    let isPrivate = true;
    let noOfFilesShared = 5;

    //Act
    for (let tokenId = 1; tokenId <= noOfFilesShared; tokenId++) {
      //loop to upload and share file.
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

  it("Should allow owner blacklist user", async () => {
    let owner = accounts[0];
    let blacklistedUser = accounts[1];

    await upboxContract
      .connect(owner)
      .addblackListedUser(blacklistedUser.address);
  });

  it("Should prevent non owners from blacklisting user", async () => {
    let randomUser = accounts[2];
    let blacklistedUser = accounts[1];

    const tryAddToBlacklist = async () => {
      let txn = await upboxContract
        .connect(randomUser)
        .addblackListedUser(blacklistedUser.address);
      await txn.wait();
    };

    expect(tryAddToBlacklist()).to.be.rejectedWith(
      "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
    );
  });

  it("Should allow owner destroy contract", async () => {
    let owner = accounts[0];
    let metaData = JSON.stringify({ game: "name" }); // metadata input to uploadFile function

    await upboxContract.uploadFile(metaData, false);
    await upboxContract.connect(owner).destroy();
    const tryGetPublicTokens = async () => {
      return await upboxContract.getAllPublicTokens();
    };

    expect(tryGetPublicTokens()).to.be.rejectedWith(
      "Error: call revert exception"
    );
  });

  it("Should prevent non owners from destroying contract", async () => {
    let randomUser = accounts[2];
    let blacklistedUser = accounts[1];

    const tryAddToBlacklist = async () => {
      let txn = await upboxContract
        .connect(randomUser)
        .addblackListedUser(blacklistedUser.address);
      await txn.wait();
    };

    expect(tryAddToBlacklist()).to.be.rejectedWith(
      "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
    );
  });

  it("Should revert when tokens is not minted/burned", async () => {
    //Arrange
    let nonExistingToken = 10;

    //Act
    const tryGetTokenUri = async () => {
      await upboxContract.tokenURI(nonExistingToken);
    };

    //Assert
    expect(tryGetTokenUri()).to.be.rejectedWith(
      "VM Exception while processing transaction: reverted with reason string 'Upbox: Token does not exist.'"
    );
  });

  it("Should get blacklisted user", async () => {
    //Arrange
    let owner = accounts[0];
    let NoOfBlackListedUsers = 5;
    let blackListedUsersCount = 0;

    //Act
    for (i = 1; i <= NoOfBlackListedUsers; i++)
      await upboxContract
        .connect(owner)
        .addblackListedUser(accounts[i].address);
    for (i = 1; i <= NoOfBlackListedUsers; i++) {
      let isBlacklisted = await upboxContract.blackListedUsers(
        accounts[i].address
      );
      if (isBlacklisted) blackListedUsersCount++;
    }

    //Assert
    expect(NoOfBlackListedUsers).equal(blackListedUsersCount);
  });

  it("Should let owner remove user from blacklist", async () => {
    //Arrange
    let owner = accounts[0];
    let NoOfBlackListedUsers = 5;
    let unBlackListedUsersCount = 0;

    //Act
    for (i = 1; i <= NoOfBlackListedUsers; i++)
      await upboxContract
        .connect(owner)
        .addblackListedUser(accounts[i].address);
    for (i = 1; i <= NoOfBlackListedUsers; i++)
      await upboxContract
        .connect(owner)
        .removeUserFromblackList(accounts[i].address);
    for (i = 1; i <= NoOfBlackListedUsers; i++) {
      let isBlacklisted = await upboxContract.blackListedUsers(
        accounts[i].address
      );
      if (!isBlacklisted) unBlackListedUsersCount++;
    }

    //Assert
    expect(NoOfBlackListedUsers).equal(unBlackListedUsersCount);
  });

  it("Should block blacklisted users from file upload", async function () {
    //Arrange
    const owner = accounts[0];
    const blacklistedUser = accounts[1];

    //Act
    await upboxContract
      .connect(owner)
      .addblackListedUser(blacklistedUser.address);
    const tryUploadFile = async () => {
      const uploadPrivateTx = await upboxContract
        .connect(blacklistedUser)
        .uploadFile("Hello world", true);
      await uploadPrivateTx.wait();
    };

    //Assert
    expect(tryUploadFile()).to.be.rejectedWith(
      "Error: VM Exception while processing transaction: reverted with reason string 'Upbox: You are blacklisted.'"
    );
  });

  it("Should let owner remove files", async function () {
    //Arrange
    let metaData = JSON.stringify({ game: "name" });
    let isPrivate = false;
    let userUploads = 5;

    //Act
    for (let i = 0; i < userUploads; i++) {
      //loop for userUploads
      let uploadPublicTx = await upboxContract
        .connect(accounts[1])
        .uploadFile(metaData, isPrivate);
      await uploadPublicTx.wait();
    }
    const txn = await upboxContract.removePublicTokens(2); //remove one of the added public files;
    await txn.wait();

    //Assert
    const allTokens = await upboxContract.getAllPublicTokens();
    assert.equal(
      allTokens.length,
      userUploads - 1,
      "Could not remove a public file!"
    );
  });

  it("Should throw an error for non existing files", async function () {
    //Arrange
    let metaData = JSON.stringify({ game: "name" });
    let isPrivate = false;
    let userUploads = 5;
    let nonExistingFile = 100;

    //Act
    for (let i = 0; i < userUploads; i++) {
      //loop for userUploads
      let uploadPublicTx = await upboxContract
        .connect(accounts[1])
        .uploadFile(metaData, isPrivate);
      await uploadPublicTx.wait();
    }
    const tryRemoveFile = async () => {
      const txn = await upboxContract.removePublicTokens(nonExistingFile); //remove a public file that does not exist;
      await txn.wait();
    };

    //Assert
    expect(tryRemoveFile()).to.be.rejectedWith(
      "Error: VM Exception while processing transaction: reverted with reason string 'Upbox: Out of bound.'"
    );
  });
});
