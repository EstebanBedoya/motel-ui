/** @packages */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

/** @components */
import RoomIdAtm from "@/components/atoms/room-id-atm";
import ListItemsMol from "@/components/molecules/list-items-mol";
import AvailableRoomContent from "./available-room-content";

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
  roomData: { id, state },
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
          width: { sm: "90vw", md: "70vw", lg: "50vw", xl: "40vw" },
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
        {state === RoomStates.AVAILABLE && <AvailableRoomContent />}
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
              },
            ]}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: " center" }}>
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
