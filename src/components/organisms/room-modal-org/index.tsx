/** @packages */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

/** @components */
import RoomIdAtm from "@/components/atoms/room-id-atm";
import ListItemsMol from "@/components/molecules/list-items-mol";

/** @styles */

/** @scripts */
import { RoomStatesSpanish, colorState } from "@/utils/room";
import { RoomStates } from "@/utils/types";

interface Props {
  roomData: any;
  open: boolean;
  handleClose: () => void;
}

const RoomModalMol = ({
  roomData: { id, state, type },
  open,
  handleClose,
}: Props) => {
  const color = colorState[state as keyof typeof colorState];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          border: "2px",
          borderStyle: "solid",
          borderColor: color,
          width: { sm: "80vw", md: "60vw", lg: "35vw" },
          maxWidth: "100%",
        },
      }}
    >
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <RoomIdAtm roomId={id} color={color} />
        <Typography fontSize={25} fontWeight={700} color={color}>
          {`Habitación - ${
            RoomStatesSpanish[state as keyof typeof RoomStatesSpanish]
          }`}
        </Typography>
      </DialogContent>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container xs={12}>
          <Grid item xs={6} borderRight="2px solid #ccc">
            {state === RoomStates.AVAILABLE && (
              <ListItemsMol
                title="Detalles:"
                items={[
                  {
                    primary: "Nombre",
                    secondary: "name",
                  },
                  {
                    primary: "Tipo de Habitacion",
                    secondary: type,
                  },
                  {
                    primary: "Precios",
                    secondary: "name",
                  },
                  {
                    primary: "Servicios",
                    secondary: "name",
                  },
                  {
                    primary: "Estado Habitación",
                    secondary: "name",
                  },
                ]}
              />
            )}
            {state === RoomStates.OCCUPIED && (
              <ListItemsMol
                title="Facturación"
                items={[
                  {
                    primary: "tipo de servicio",
                    secondary: "rato",
                  },
                  {
                    primary: "Adicionales",
                    secondary: "name",
                  },
                  {
                    primary: "Total",
                    secondary: "100.000",
                  }
                ]}
              />
            )}
          </Grid>
          <Grid item xs={6} px={2}>
            <ListItemsMol
              title="Adicionales:"
              items={["add 1", "add 2", "add 3"]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {state === RoomStates.OCCUPIED && (
          <Button variant="contained" color="error">
            Check out
          </Button>
        )}
        <Button onClick={handleClose} variant="contained">
          {state === RoomStates.OCCUPIED ? "Aumentar Servicio" : "Check in"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomModalMol;
