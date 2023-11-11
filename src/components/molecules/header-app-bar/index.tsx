/** @packages */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/** @component */
import SelectAtm from "@/components/atoms/select-atm.tsx";

const HeaderAppBar = () => {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Typography variant="h3">Rooms</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <SelectAtm />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          <Chip label="available" color="success" size="small" />
          <Chip label="occupied" color="error" size="small" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
