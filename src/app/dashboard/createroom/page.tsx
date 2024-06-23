'use client';

/** @component */
import { Grid } from '@mui/material';
import CreateRoomSection from '@/app/_components/organisms/room-modal-org/create-room-section';

export default function CreateRoom() {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      mt={5}
      mb={5}
      gap={5}
    >
      <CreateRoomSection />
    </Grid>
  );
}
