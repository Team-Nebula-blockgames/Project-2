import "./App.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Home from "./Pages/home";
import MyFiles from "./Pages/myFiles";
import Library from "./Pages/library";
import getEthers from "./getEthers";
import { Contract } from "ethers";
import Nebula from "./contracts/Nebula.json";
import "./styles/react-spinner-loader.css";
import { Bars } from "react-loader-spinner";

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

  useEffect(() => {
    const getData = async () => {
      const provid = await getEthers();
      setProvider(provid);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    setLoader(true);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const nebulaContract = new Contract(
      process.env.REACT_APP_NEBULA_ADDRESS,
      Nebula.abi,
      provider
    );
    const allPublicTokens = await nebulaContract.getAllPublicTokens();
    const myPublicTokens = await nebulaContract.getMyPublicTokens(address);
    const myPrivateTokens = await nebulaContract.getMyPrivateTokens(address);
    const myRecievedTokens = await nebulaContract.getMyRecievedTokens(address);

    const getFileData = async (tokens, length) => {
      const data = [];
      for (var i = 0; i < length; i++) {
        const fileData = await nebulaContract.tokenURI(tokens[i]);
        data.push(JSON.parse(fileData));
      }
      return data;
    };

    const allPublic = await getFileData(allPublicTokens);
    const userPublic = await getFileData(myPublicTokens);
    const userPrivate = await getFileData(myPrivateTokens);
    const userRecieved = await getFileData(myRecievedTokens);

    console.log(allPublic);
    console.log(userPublic);

    setPublicFiles(allPublic);
    setUserPublicFiles(userPublic);
    setUserPrivateFiles(userPrivate);
    setUserRecievedFiles(userRecieved);

    setContractMethods(nebulaContract.connect(signer));
    setAddress(address);
    setLoader(false);
  };

  return loader ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
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
        />
      )}
    </Box>
  );
}

export default App;
