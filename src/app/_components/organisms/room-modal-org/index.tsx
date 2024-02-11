/** @packages */
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

/** @components */
import AvailableRoom from "./available-room";
import CleaningRoom from "./cleaning-room";
import MaintenanceRoom from "./maintenance-room";
import RoomIdAtm from "@/app/_components/atoms/room-id-atm";

/** @styles */

/** @scripts */
import { RoomStatesSpanish, colorState } from "@/utils/room";
import { RoomStates } from "@/utils/types";
import OccupiedRoomContent from "./occupied-room";

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

  const stateContent = {
    [RoomStates.AVAILABLE]: <AvailableRoom.Content />,
    [RoomStates.OCCUPIED]: <OccupiedRoomContent.Content />,
    [RoomStates.CLEANING]: <CleaningRoom.Content />,
    [RoomStates.MAINTENANCE]: <MaintenanceRoom.Content inMaintenance={false} />,
  };

  const stateActions = {
    [RoomStates.AVAILABLE]: <AvailableRoom.Actions handleClose={handleClose} />,
    [RoomStates.OCCUPIED]: (
      <OccupiedRoomContent.Actions handleClose={handleClose} />
    ),
    [RoomStates.CLEANING]: <CleaningRoom.Actions handleClose={handleClose} />,
    [RoomStates.MAINTENANCE]: (
      <MaintenanceRoom.Actions
        handleClose={handleClose}
        inMaintenance={false}
      />
    ),
  };

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
          minHeight: "65vh",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        borderBottom={2}
        borderColor={color}
        py={3}
      >
        <RoomIdAtm roomId={id} color={color} />
        <Typography fontSize={25} fontWeight={700} color={color}>
          {`Habitación - ${
            RoomStatesSpanish[state as keyof typeof RoomStatesSpanish]
          }`}
        </Typography>
      </Box>
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
      <DialogContent dividers>
        {stateContent[state as keyof typeof stateContent]}
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: " center" }}>
        {stateActions[state as keyof typeof stateActions]}
      </DialogActions>
    </Dialog>
  );
};

export default RoomModalMol;
