# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

View Upbox contract on [etherscan](0x5797ff9d5C1Ca21f28E6E54d4b1A3261856863e5)

# Client folder

The client folder is the folder for the react frontend app calling the contracts. The client/contracts directory contains the compiled contracts for the react front end application.

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
