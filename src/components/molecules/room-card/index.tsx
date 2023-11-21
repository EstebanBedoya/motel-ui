"use client";

/** @package */
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/** @scripts */
import DialogMle from "../dialog-mle";
import { useState } from "react";

const RoomCard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

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
          <Typography variant="h5">105</Typography>
          <Divider />
          <Typography variant="h6">sencilla</Typography>
        </Grid>
        <Grid item xs={2} sx={{ backgroundColor: "green", borderRadius: 2 }} />
      </Grid>
      <DialogMle open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default RoomCard;
