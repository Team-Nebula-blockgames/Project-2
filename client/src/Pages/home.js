import './App.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import github from "../icons/github.svg"

function Home() {
  return (
    <Box flexGrow={1} sx={{
      background: '#222222', 
      display: 'flex',
      justifyContent: 'center'
    }}>
        <Box sx={{
            position: 'absolute',
        }}>
        </Box>
        <Typography sx={{
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: '77px',
          letterSpacing: '0em',
          textAlign: 'center',
          color: '#FFFFFF',
          marginTop: '287.75px',
          width: '1161.65px'
        }}>Sharing <span></span> with friends and colleagues have never been easier </Typography>

        <Typography sx={{
          fontSize: '32px',
          fontWeight: 400,
          lineHeight: '39px',
          textAlign: 'center',
          color: '#AAAAAA',
          marginTop: '287.75px',
          width: '865.89px'
        }}>Supercharge your files security with a decentralized file sharing system. </Typography>
        <Button sx={{
          background: '#B973FF',
          boxSizing: 'border-box',
borderRadius: '32px 0px'
        }}>{text}</Button>
        <Box sx={{
            position: 'absolute',
            width: '100%',
            heigth: '81.38px',
            background: '#111111',
            bottom: 0,
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <Typography>Made with ❤ by TEAM NEBULA</Typography>
          <img src={github} alt='github' />
          </Box>
        </Box>
    </Box>
  );
}

export default Home;
