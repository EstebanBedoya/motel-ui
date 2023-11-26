"use client";

/** @package */
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/** @scripts */
import DialogMol from "../dialog-mol";
import { useState } from "react";

type Props = {
  room: any;
};

const colorState = {
  available: "green",
  occupied: "red",
};

const RoomCard = ({ room }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Grid
        container
        item
        md={3}
        onClick={handleOpenModal}
        xl={2}
        xs={12}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          cursor: "pointer",
          padding: "10px",
        }}
      >
        <Grid item xs={10} pr="7px">
          <Typography variant="h5">{room.roomId}</Typography>
          <Divider />
          <Typography variant="h6">{room.name}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: colorState[room.state as keyof typeof colorState],
            borderRadius: 2,
          }}
        />
      </Grid>
      <DialogMol open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default RoomCard;
