import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import github from "../icons/github.svg";
import logo from "../icons/logo.svg";
import upload from "../icons/upload.svg";
import addressShortner from "../utils/addressShortener";
import UploadForm from "../Components/uploadForm";
import UploadSuccesful from "../Components/uploadSuccesful";
import WrongNetwork from "../Components/wrongNetwork";

function Home(props) {
  const {
    address,
    initialize,
    setView,
    contractMethods,
    addFile,
    network,
    networkModal,
  } = props;
  const [uploadModal, setUploadModal] = useState(false);
  const [succesModal, setSuccesModal] = useState(false);

  //an array of for looping throygh text and colors to be animated
  const effects = [
    { text: "Books", color: "#934DD9" },
    { text: "Articles", color: "#16A5FB" },
    { text: "Media", color: "#03CF36" },
  ];

  //a variable for keeping track of the current text animation
  const [num, setNum] = useState(0);
  const [effect, setEffect] = useState(effects[num]);

  //a function that changes between animations in thr effects array
  function change() {
    if (num !== 2) {
      setEffect(effects[num + 1]);
      setNum(num + 1);
    } else {
      setEffect(effects[0]);
      setNum(0);
    }
  }

  //a useEffect that changes the animation every 2seconds
  useEffect(() => {
    setTimeout(() => {
      change();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return (
    <Box
      sx={{
        background: "#222222",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          width: "86.14%",
          height: "40px",
          top: "25px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", width: "164.47px" }}
        />
        <Box
          sx={{
            width: address === "Connect Wallet" ? "475px" : "430px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          {address === "Connect Wallet" ? (
            <Box sx={{ padding: 0, margin: 0, display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  marginRight: "49px",
                }}
              >
                Home
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                }}
              >
                Community
              </Typography>
            </Box>
          ) : (
            <Box sx={{ padding: 0, margin: 0, display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  marginRight: "49px",
                }}
                onClick={() => setView("myfiles")}
              >
                Files
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "#FFFFFF",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                onClick={() => setView("library")}
              >
                Library
              </Typography>
            </Box>
          )}
          <Button
            sx={{
              border: "2px solid #B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              width: "213px",
              height: "40px",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "20px",
              color: "#B973FF",
            }}
            onClick={async () => {
              console.log("Getting Data");
              console.log(address);
              //checks if the user has already connected and connects if not
              if (address === "Connect Wallet") await initialize();
              console.log(address);
            }}
          >
            {/* addresShortner returns a shortened version of an address */}
            {address === "Connect Wallet" ? address : addressShortner(address)}
          </Button>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: "42px",
          fontWeight: 700,
          lineHeight: "56px",
          letterSpacing: "0em",
          textAlign: "center",
          color: "#FFFFFF",
          width: "67.225%",
          marginTop: "200px",
        }}
      >
        Sharing <span style={{ color: effect.color }}>{effect.text}</span> with
        friends and colleagues has never been easier{" "}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "39px",
          textAlign: "center",
          color: "#AAAAAA",
          marginTop: "30px",
          width: "50.11%",
        }}
      >
        Supercharge your files security with a decentralized file sharing
        system.{" "}
      </Typography>
      <Button
        variant="contained"
        sx={{
          background: "#B973FF",
          boxSizing: "border-box",
          borderRadius: "32px 0px",
          marginTop: "40px",
          width: "328px",
          height: "52px",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "29px",
          color: "#222222",
          "&:hover": {
            backgroundColor: "#B973FF",
          },
        }}
        onClick={async () => {
          address === "Connect Wallet"
            ? await initialize()
            : setUploadModal(true);
        }}
      >
        {address === "Connect Wallet" ? (
          "Connect Wallet"
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                color: "#222222",
                padding: 0,
                margin: 0,
                marginRight: "10px",
              }}
            >
              Upload File
            </Typography>
            <img
              src={upload}
              alt="Upload icon"
              style={{ width: "18px", height: "15px" }}
            />
          </Box>
        )}
      </Button>
      {!network && (
        <Typography
          sx={{
            height: "15px",
            color: "white",
            marginTop: "5px",
          }}
        >
          Please connect to rinkeby Network
        </Typography>
      )}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "40.38px",
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "86.14%",
            height: "20px",
          }}
        >
          <Typography
            sx={{
              height: "20px",
              color: "white",
            }}
          >
            Made with ❤ by TEAM NEBULA
          </Typography>
          <img
            src={github}
            alt="github"
            style={{ height: "100%", width: "19.51px" }}
          />
        </Box>
      </Box>
      {uploadModal && (
        <UploadForm
          setUploadModal={setUploadModal}
          contractMethods={contractMethods}
          setSuccesModal={setSuccesModal}
          addFile={addFile}
        />
      )}
      {succesModal && <UploadSuccesful />}
      {networkModal && <WrongNetwork network={network} />}
    </Box>
  );
}

export default Home;
