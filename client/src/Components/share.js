import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAddress from "./inputAddress";

function Share(props) {
  const { setShareModal } = props;

  return (
    <Box
      sx={{
        background: "rgba(34, 34, 34, 0.317)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: "5",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setShareModal(false);
      }}
    >
      <Box
        sx={{
          width: "62.62%",
          height: "367px",
          background: "#333333",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShareModal(true);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            width: "446px",
            height: "86px",
            marginTop: "87px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "19px",
              color: "#FFFFFF",
              marginBottom: "5px",
            }}
          >
            Share with
          </Typography>
          <InputAddress />
        </Box>
        <Box sx={{ width: "446px" }}>
          <Button
            variant="contained"
            sx={{
              width: "254.22px",
              height: "50.38px",
              background: "#B973FF",
              border: "2px solid #B973FF",
              boxSizing: "border-box",
              borderRadius: "32px 0px",
              marginTop: "56px",
              fontWeight: 700,
              fontSize: "18.6016px",
              lineHeight: "23px",
              color: "#222222",
              "&:hover": {
                backgroundColor: "#B973FF",
              },
            }}
          >
            Approve
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Share;
