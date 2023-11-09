/** @packages */
import SelectAtm from "@/components/atoms/select-atm.tsx";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const HeaderRooms = () => {
  return (
    <Grid container p={2} alignItems="center" justifyContent="flex-start">
      <Grid item md={5} sm={4} xs={12}>
        <Typography variant="h3">Rooms</Typography>
      </Grid>
      <Grid display="flex" item md={5} sm={6} xs={12}>
        <SelectAtm />
      </Grid>
      <Grid display="flex" item md={2} sm={2} xs={12} justifyContent="flex-end">
        <Stack direction="row" spacing={1}>
          <Chip label="available" color="success" variant="outlined" />
          <Chip label="occupied" color="error" variant="outlined" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HeaderRooms;
