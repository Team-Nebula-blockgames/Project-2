import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import github from "../icons/github.svg";
import logo from "../icons/logo.svg";
import upload from "../icons/upload.svg";
import addressShortner from "../utils/addressShortener";
import Input from "../Components/input";
import GridBox from "../Components/gridBox";
import Share from "../Components/share";
import UploadForm from "../Components/uploadForm";
import UploadSuccesful from "../Components/uploadSuccesful";
import arrayBreaker from "../utils/arrayBreaker";

function Library(props) {
  const { address, initialize, setView } = props;
  const [uploadModal, setUploadModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [page, setPage] = useState(0);

  const files = [
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "private",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "private",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "private",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "private",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "private",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
    {
      name: "Seun",
      description: "A cool and fit blockchain dev",
      access: "public",
    },
  ];

  const fileStorage = arrayBreaker(files, 12);

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
                onClick={() => setView("home")}
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
                  cursor: "pointer",
                }}
                onClick={() => setView("myfiles")}
              >
                My Files
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
      <Box
        sx={{
          height: "66px",
          width: "86.1%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px",
          marginTop: "120px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "58px",
            color: "#FFFFFF",
          }}
        >
          Library
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "8px",
            width: "489px",
            height: "66px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              width: "232px",
              height: "50px",
              margin: "0 10px",
              "&:hover": {
                backgroundColor: "#B973FF",
              },
            }}
            onClick={() => setUploadModal(true)}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#222222",
                padding: 0,
                margin: 0,
                marginRight: "8px",
              }}
            >
              Upload File
            </Typography>
            <img
              src={upload}
              alt="Upload icon"
              style={{ width: "15.5px", height: "10.5px" }}
            />
          </Button>
          <Input />
        </Box>
      </Box>
      <Box
        sx={{
          width: "86.1%",
          marginTop: "20px",
        }}
      >
        {fileStorage.map((item, index) => {
          return (
            page === index && (
              <GridBox files={item} setShareModal={setShareModal} />
            )
          );
        })}
        <Box
          sx={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {fileStorage.map((item, index) => {
            return (
              <Box
                sx={{
                  background: page === index ? "#444444" : "#737373",
                  border: "1px solid #AAAAAA",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  height: "25px",
                  width: "25px",
                  marginRight: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </Box>
            );
          })}
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "19px",
              color: "#FFFFFF",
            }}
          >{`${page + 1} of ${fileStorage.length}`}</Typography>
        </Box>
      </Box>
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
      {uploadModal && <UploadForm setUploadModal={setUploadModal} />}
      {shareModal && <Share setShareModal={setShareModal} />}
    </Box>
  );
}

export default Library;
