import Grid from "@mui/material/Grid";
import Card from "./card";

function GridBox(props) {
  const { files, setShareModal } = props;

  return (
    <Grid container spacing={2} columns={30}>
      {files.map((item) => {
        return (
          <Grid item md={5} lg={5} xl={5}>
            <Card {...item} setShareModal={setShareModal} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default GridBox;
