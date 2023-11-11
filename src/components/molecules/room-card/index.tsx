/** @package */
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const RoomCard = () => {
  return (
    <Grid
      container
      item
      md={3}
      xs={12}
      xl={2}
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        padding: "10px",
      }}
    >
      <Grid item xs={10} pr="7px">
        <Typography variant="h5">105</Typography>
        <Divider />
        <Typography variant="h6">sencilla</Typography>
      </Grid>
      <Grid item xs={2} sx={{ backgroundColor: "green", borderRadius: 2 }} />
    </Grid>
  );
};

export default RoomCard;
