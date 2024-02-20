/** @packages */
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

/** @components */
import AvailableRoom from './available-room';
import CleaningRoom from './cleaning-room';
import MaintenanceRoom from './maintenance-room';
import RoomIdAtm from '@/app/_components/atoms/room-id-atm';

/** @styles */

/** @scripts */
import { RoomStatusSpanish, colorState } from '@/utils/room';
import { RoomStatus } from '@/utils/types';
import OccupiedRoomContent from './occupied-room';
import { trpc } from '@/app/_trpc/client';

interface Props {
  roomId: number;
  open: boolean;
  handleClose: () => void;
}

const RoomModalMol = ({ roomId, open, handleClose }: Props) => {
  const { data: room } = trpc.rooms.getById.useQuery(roomId);
  const { status } = room ?? {};
  const color = colorState[status as keyof typeof colorState];
  const matchMaxWidth = useMediaQuery('(max-width:600px)');

  const stateContent = {
    [RoomStatus.AVAILABLE]: (
      <AvailableRoom roomData={room} handleClose={handleClose} />
    ),
    [RoomStatus.OCCUPIED]: <OccupiedRoomContent.Content />,
    [RoomStatus.CLEANING]: <CleaningRoom.Content />,
    [RoomStatus.MAINTENANCE]: <MaintenanceRoom.Content inMaintenance={false} />,
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          border: '2px',
          borderStyle: 'solid',
          borderColor: color,
          width: {
            sm: '90vw',
            md: '70vw',
            lg: '50vw',
            xl: '40vw',
          },
          maxWidth: '100%',
          minHeight: '65vh',
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
        <RoomIdAtm roomId={+roomId} color={color} />
        <Typography
          fontSize={matchMaxWidth ? 20 : 25}
          fontWeight={700}
          color={color}
        >
          {`Habitación - ${
            RoomStatusSpanish[status as keyof typeof RoomStatusSpanish]
          }`}
        </Typography>
      </Box>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {stateContent[status as keyof typeof stateContent]}
    </Dialog>
  );
};

export default RoomModalMol;
