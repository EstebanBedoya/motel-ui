/** @package */
import RoomCard from "@/components/molecules/room-card";
import HeaderRooms from "@/components/organisms/header-rooms";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const array = new Array(50).fill(0);

export default function Page() {
  return (
    <>
      <HeaderRooms />
      <Divider variant="middle" />
      <Grid container p={3} gap={3} justifyContent="center">
        {array.map((_, index) => (
          <RoomCard key={index} />
        ))}
      </Grid>
    </>
  );
}
