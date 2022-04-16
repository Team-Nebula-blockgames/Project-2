import "./App.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Home from "./Pages/home";
import MyFiles from "./Pages/myFiles";
import Library from "./Pages/library";
import Admin from "./Pages/admin";
import Blocked from "./Pages/blocked";
import getEthers from "./getEthers";
import { Contract } from "ethers";
import Nebula from "./contracts/Upbox.json";
import "./styles/react-spinner-loader.css";
import { Bars } from "react-loader-spinner";
import validateMetaData from "./utils/validateMetaData";

function App() {
  const [address, setAddress] = useState("Connect Wallet");
  const [provider, setProvider] = useState({});
  const [view, setView] = useState("home");
  const [contractMethods, setContractMethods] = useState({});
  const [publicFiles, setPublicFiles] = useState([]);
  const [userPublicFiles, setUserPublicFiles] = useState([]);
  const [userPrivateFiles, setUserPrivateFiles] = useState([]);
  const [userRecievedFiles, setUserRecievedFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [network, setNetwork] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const provid = await getEthers();
      setProvider(provid);
      if (window.ethereum.networkVersion === "4") setNetwork(true);
      setNetwork(true);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    if (!network) {
      setNetworkModal(true);
      setTimeout(() => {
        setNetworkModal(false);
      }, 3000);
    } else {
      setLoader(true);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const nebulaContract = new Contract(
        process.env.REACT_APP_NEBULA_ADDRESS,
        Nebula.abi,
        provider
      );
      console.log(nebulaContract);
      const name = await nebulaContract.name();
      console.log(name);
      const allPublicTokens = await nebulaContract.getAllPublicTokens();
      const myPublicTokens = await nebulaContract.getMyPublicTokens();
      const myPrivateTokens = await nebulaContract.getMyPrivateTokens();
      const myRecievedTokens = await nebulaContract.getMyRecievedTokens();
      const blacklistedUsers = await nebulaContract.getBlacklistedUsers();

      console.log("all pubic tokens: ", allPublicTokens);
      const getFileData = async (tokens) => {
        const data = [];
        for (var i = 0; i < tokens.length; i++) {
          console.log("tokenId: ", Number(tokens[i]));
          const tokenUri = await nebulaContract.tokenURI(Number(tokens[i]));
          fetch(tokenUri)
            .then((resp) => {
              return resp.json();
            })
            .then((resp) => {
              console.log("fileData: ", resp);
              if (validateMetaData(resp)) {
                data.push(resp);
              }
            });
        }
        return data;
      };

      const allPublic = await getFileData(allPublicTokens);
      const userPublic = await getFileData(myPublicTokens);
      const userPrivate = await getFileData(myPrivateTokens);
      const userRecieved = await getFileData(myRecievedTokens);

      console.log("allPublic: ", allPublic);
      console.log(userPublic);

      setPublicFiles(allPublic);
      setUserPublicFiles(userPublic);
      setUserPrivateFiles(userPrivate);
      setUserRecievedFiles(userRecieved);

      setContractMethods(nebulaContract.connect(signer));
      setAddress(address);
      if (blacklistedUsers.includes(address)) setView("blacklisetd");
      const isAdmin = await nebulaContract.isAdmin();
      if (isAdmin) setView("admin");
      setLoader(false);
    }
  };

  const addFile = (file) => {
    if (file.access === "public") {
      const allPublic = [...publicFiles];
      const userPublic = [...userPublicFiles];
      allPublic.push(file);
      userPublic.push(file);
      setPublicFiles(allPublic);
      setUserPublicFiles(userPublic);
    } else {
      const userPrivate = [...userPrivateFiles];
      userPrivate.push(file);
      setUserPrivateFiles(userPrivate);
    }
  };

  console.log(publicFiles);

  return loader ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#222222",
      }}
    >
      <Bars color="#B973FF" height={300} width={300} />
    </Box>
  ) : (
    <Box flexGrow={1} position="relative">
      {view === "home" && (
        <Home
          setAddress={setAddress}
          address={address}
          initialize={initialize}
          setView={setView}
          contractMethods={contractMethods}
          network={network}
          addFile={addFile}
          networkModal={networkModal}
        />
      )}
      {view === "myfiles" && (
        <MyFiles
          address={address}
          setView={setView}
          publicFiles={publicFiles}
          userPublicFiles={userPublicFiles}
          userPrivateFiles={userPrivateFiles}
          userRecievedFiles={userRecievedFiles}
          contractMethods={contractMethods}
          addFile={addFile}
        />
      )}
      {view === "library" && (
        <Library
          address={address}
          setView={setView}
          publicFiles={publicFiles}
          userPublicFiles={userPublicFiles}
          userPrivateFiles={userPrivateFiles}
          userRecievedFiles={userRecievedFiles}
          contractMethods={contractMethods}
          addFile={addFile}
        />
      )}
      {view === "blacklisted" && <Blocked address={address} />}
      {view === "admin" && (
        <Admin address={address} contractMethods={contractMethods} />
      )}
    </Box>
  );
}

export default App;
