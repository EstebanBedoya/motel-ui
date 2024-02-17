/** @packages */
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

/** @components */
import AvailableRoom from "./available-room";
import CleaningRoom from "./cleaning-room";
import MaintenanceRoom from "./maintenance-room";
import RoomIdAtm from "@/app/_components/atoms/room-id-atm";

/** @styles */

/** @scripts */
import { RoomStatusSpanish, colorState } from "@/utils/room";
import { RoomStatus } from "@/utils/types";
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
  const matchMaxWidth = useMediaQuery("(max-width:600px)");

  const stateContent = {
    [RoomStatus.AVAILABLE]: <AvailableRoom.Content />,
    [RoomStatus.OCCUPIED]: <OccupiedRoomContent.Content />,
    [RoomStatus.CLEANING]: <CleaningRoom.Content />,
    [RoomStatus.MAINTENANCE]: <MaintenanceRoom.Content inMaintenance={false} />,
  };

  const stateActions = {
    [RoomStatus.AVAILABLE]: <AvailableRoom.Actions handleClose={handleClose} />,
    [RoomStatus.OCCUPIED]: (
      <OccupiedRoomContent.Actions handleClose={handleClose} />
    ),
    [RoomStatus.CLEANING]: <CleaningRoom.Actions handleClose={handleClose} />,
    [RoomStatus.MAINTENANCE]: (
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
        alignItems="center"
        borderBottom={2}
        borderColor={color}
        display="flex"
        flexDirection="column"
        gap={2}
        py={3}
      >
        <RoomIdAtm roomId={id} color={color} />
        <Typography fontSize={matchMaxWidth ? 20 : 25} fontWeight={700} color={color}>
          {`Habitación - ${
            RoomStatusSpanish[state as keyof typeof RoomStatusSpanish]
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
