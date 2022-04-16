# UpBox

This is a decentralized library where users can upload files and retrieve files, share files with other users , using their wallet address.

The supported File types are:

- Articles
- Books

Default permission for uploading file is public

View Upbox contract on [etherscan](0x5797ff9d5C1Ca21f28E6E54d4b1A3261856863e5)

# Contribution Guide

- When adding new contracts contract name and contract file name should be same.
- All functions should have explicit comment (and test)
-

# Folder Structure

The Project is divided into two part, The Client (frontend) and the Smart Contracts.

The client folder is the folder for the react frontend app calling the contracts. The client/contracts directory contains the compiled contracts for the react front end application.

Editing the clients folder

# Steps

- Create a .env file with the following variables

1. CONTRACT_NAMES = names of the contract that should be copied to the react app directory seperated by commas.
2. NODE_PROVIDER_URL = API link from node provider infura/alchemy etc.
3. PRIVATE_KEY = your wallet private key for deploying to rinkeby testnet.

- Run "npm install" (node version ^16 )

- Try running some of the following tasks:

```shell
npm run node (to start localhost testnet)
npm run deploy (to run deploy script on localhost)
npm run compile (to complie contracts and copy contract ABI to the client/contracts folder )
npm run deploy-rinkeby (to run deploy script on rinkeby testnet)
npm run test (to run contract test)
```
