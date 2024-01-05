/** @package */
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Key } from "react";

/** @component */
import RoomCard from "@/components/molecules/room-card";

/** @scripts */
import RoomService from "@/services/rooms";

export default async function Page() {
  const data = await RoomService.getAll();

  return (
    <>
      <Grid container p={3} gap={3} justifyContent="center">
        {data.map((room: any, index: Key | null | undefined) => (
          <RoomCard room={room} key={index} />
        ))}
      </Grid>
    </>
  );
}
