const { ethers } = require("hardhat");
const { use, expect, assert} = require("chai");

// const { ContractFactory } = require("ethers");
const { base64 } = require("ethers/lib/utils");

let accounts;

describe("UpBox", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Nebula");
        Nebula = await ethers.getContractFactory("Nebula");
        nebula = await Nebula.deploy();
        await nebula.deployed();
        owner = accounts[0];
    })

    it("Should deploy contract", async function() {
        expect(await nebula.deployed(), "Contract not deployed");
        console.log("Deploying...")
    })

    it("User should be able to upload public files", async function() {      
        const uploadPublicTx = await nebula.uploadFile("Hello world", false);
        await uploadPublicTx.wait();

        const allTokens = await nebula.getAllPublicTokens();
        expect(Number(allTokens)).to.equals(1, "Could not upload a public file!");

        const userTokens = await nebula.getUserPublicTokens(owner.address);
        assert.equal(userTokens, 1, "Could not upload a public file!");
        console.log("Uploading a public file...")
    })

    it("User should be able to upload private files", async function() {
        const uploadPrivateTx = await nebula.uploadFile("Hello world", true);
        await uploadPrivateTx.wait();

        const userTokens = await nebula.getUserPrivateTokens(owner.address);
        assert.equal(userTokens, 1, "Could not upload a private file!")
        console.log("Uploading a private file...")
    })

    // it("User should be able to share files", async function() {
    //     const shareTx= await nebula.shareToken(accounts[1].address, 1);
    //     await shareTx.wait();

    //     const recieved = await nebula.getMyRecievedTokens(accounts[1].address);
    //     expect(Number(recieved)).to.equals(1);
    // })

    it("Should return a URI for a token", async function() {
        const uploadPublicTx = await nebula.uploadFile("Hello world!", false);
        await uploadPublicTx.wait();
        
        let tokenId = 1;
        json = "SGVsbG8gd29ybGQh";
        
        const URI = await nebula.tokenURI(tokenId);
        expect(URI).to.equals(
            String(('data:application/json;base64,'+ json)),
            "Could not get URI!"
        );
        console.log("Getting token URI...")
    })

    it("Should return all public files in the library", async function() {
        const uploadPublicTx = await nebula.uploadFile("Hello world!", false);
        await uploadPublicTx.wait();

        const file = await nebula.getAllPublicTokens();
        expect(Number(file)).to.equals(1, "Could not get all public tokens!");
        console.log("Getting all public files in the library...")
    })

    it("Should return all public files of a user", async function() {
        const uploadPublicTx = await nebula.uploadFile("Hello world!", false);
        await uploadPublicTx.wait();

        const userTokens = await nebula.getUserPublicTokens(owner.address);
        assert.equal(userTokens, 1, "Could not get public tokens of a user!") 
        console.log("Getting all public files of a user...")
    })

    it("Should return all private files of a user", async function() {
        const uploadPrivateTx = await nebula.uploadFile("Hello world!", true);
        await uploadPrivateTx.wait();

        const userTokens = await nebula.getUserPrivateTokens(owner.address);
        assert.equal(userTokens, 1, "Could not get private files of a user!")
        console.log("Getting all private files of a user...")
    })

    it("Should return received tokens of a usre", async function() {
        // const shareTx= await nebula.shareToken(accounts[1].address, 1);
        // await shareTx.wait();

        const received = await nebula.getUserRecievedTokens(accounts[1].address);
        expect(Number(received)).to.equals(0, "Could not get recieved tokens!");
        console.log("Getting all received files...")
    })

});