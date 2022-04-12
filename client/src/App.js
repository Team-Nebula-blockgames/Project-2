import "./App.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Home from "./Pages/home";
import getEthers from "./getEthers";
// import { Contract, utils } from "ethers";

function App() {
  const [address, setAddress] = useState("Connect Wallet");
  const [provider, setProvider] = useState({});

  useEffect(() => {
    const getData = async () => {
      const provid = await getEthers();
      setProvider(provid);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
  };

  return (
    <Box flexGrow={1}>
      <Home setAddress={setAddress} address={address} initialize={initialize} />
    </Box>
  );
}

export default App;
