/** @package */
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

/** @component */
import RoomCard from "@/components/molecules/room-card";
import HeaderAppBar from "@/components/molecules/header-app-bar";
import SelectAtm from "@/components/atoms/select-atm.tsx";

const array = new Array(50).fill(0);

export default function Page() {
  return (
    <>
      <HeaderAppBar />
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          paddingTop: 3,
          paddingX: 3,
        }}
      >
        <SelectAtm fullWidth />
      </Box>
      <Grid container p={3} gap={3} justifyContent="center">
        {array.map((_, index) => (
          <RoomCard key={index} />
        ))}
      </Grid>
    </>
  );
}
