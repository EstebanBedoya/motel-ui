/** @package */
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Key } from "react";

/** @component */
import RoomCard from "@/components/molecules/room-card";
import HeaderAppBar from "@/components/molecules/header-app-bar";
import SelectAtm from "@/components/atoms/select-atm";

/** @scripts */
import RoomService from "@/services/rooms";

export default async function Page() {
  const data = await RoomService.getAll();

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
        {data.map((room: any, index: Key | null | undefined) => (
          <RoomCard room={room} key={index} />
        ))}
      </Grid>
    </>
  );
}
