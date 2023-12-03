"use client";

/** @package */
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

/** @scripts */
import DialogMol from "../dialog-mol";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { formatPrice } from "@/utils/format";

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
      <DialogMol
        open={openModal}
        setOpen={setOpenModal}
        title={room.roomId}
        subtitle={room.name}
      >
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">
            Select service type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{
              display: "flex",
              gap: 7,
            }}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={`Normal - ${formatPrice(room.priceId.normal)}`}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label={`Dawn - ${formatPrice(room.priceId.dawn)}`}
            />
          </RadioGroup>
        </FormControl>
      </DialogMol>
    </>
  );
};

export default RoomCard;
