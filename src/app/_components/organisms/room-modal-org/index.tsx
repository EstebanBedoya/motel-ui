/** @packages */
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';

/** @components */
import { useState } from 'react';
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
import CreateRoomCardMol from '../../molecules/create-room-card-mol';

interface Props {
  roomId: number;
  open: boolean;
  handleClose: () => void;
}

const RoomModalMol = ({ roomId, open, handleClose }: Props) => {
  const [isEditRoom, setIsEditRoom] = useState(false);
  const { data: room } = trpc.rooms.getById.useQuery(roomId);
  const { status } = room ?? {};
  const matchMaxWidth = useMediaQuery('(max-width:600px)');
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const color = colorState[
    openMaintenance
      ? RoomStatus.MAINTENANCE
      : (status as keyof typeof colorState)
  ];

  const stateContent = {
    [RoomStatus.AVAILABLE]: (
      <AvailableRoom roomData={room} handleClose={handleClose} />
    ),
    [RoomStatus.OCCUPIED]: (
      <OccupiedRoomContent roomData={room} handleClose={handleClose} />
    ),
    [RoomStatus.CLEANING]: (
      <CleaningRoom roomData={room} handleClose={handleClose} />
    ),
    [RoomStatus.MAINTENANCE]: (
      <MaintenanceRoom
        roomData={room}
        inMaintenance
        handleClose={handleClose}
      />
    ),
  };

  const handleOpenMaintenance = () => {
    setOpenMaintenance(true);
  };

  const handleCloseMaintenance = () => {
    setOpenMaintenance(false);
    handleClose();
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
        bgcolor={`${color}15`}
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
            RoomStatusSpanish[
              openMaintenance
                ? RoomStatus.MAINTENANCE
                : (status as keyof typeof RoomStatusSpanish)
            ]
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
      <IconButton
        aria-label="edit"
        onClick={() => setIsEditRoom(!isEditRoom)}
        sx={{
          position: 'absolute',
          left: 8,
          top: 40,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <EditIcon />
      </IconButton>
      {!(openMaintenance || status === RoomStatus.MAINTENANCE) && !isEditRoom && (
        <IconButton
          aria-label="maintenance"
          onClick={handleOpenMaintenance}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <BuildIcon />
        </IconButton>
      )}
      {!(openMaintenance || isEditRoom) && (
        stateContent[status as keyof typeof stateContent]
      )}
      {openMaintenance && (
        <MaintenanceRoom
          roomData={room}
          inMaintenance={false}
          handleClose={handleCloseMaintenance}
        />
      )}
      {isEditRoom && <CreateRoomCardMol onSubmit={() => {}} isEdit editData={room} />}
    </Dialog>
  );
};

export default RoomModalMol;
