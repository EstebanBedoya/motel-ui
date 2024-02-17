/** @package */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/** @style */
import { useMediaQuery } from '@mui/material';

/** @component */
import RoomIdAtm from '../room-id-atm';
import { RoomStatus } from '@/utils/types';
import { RoomStatusSpanish, colorState } from '@/utils/room';

interface Props {
  roomId: number;
  state: RoomStatus;
  type: string;
  onClick?: () => void;
}
const RoomItemAtm = ({
  roomId, state, type, onClick,
}: Props) => {
  const color = colorState[state];
  const matchMaxWidth = useMediaQuery('(max-width:500px)');

  return (
    <Box
      alignItems="center"
      border={4}
      borderColor={color}
      display="flex"
      flexDirection="column"
      gap={2}
      height={matchMaxWidth ? 200 : 226}
      onClick={onClick}
      width="100%"
      maxWidth="250px"
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        cursor: 'pointer',
        margin: '5px',
      }}
    >
      <RoomIdAtm
        roomId={roomId}
        matchMaxWidth={matchMaxWidth}
        color={color}
        sx={{ marginTop: 3 }}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontSize={matchMaxWidth ? 20 : 25} fontWeight={600}>
          {type}
        </Typography>
        <Typography fontSize={20} fontWeight={600} color={color}>
          {RoomStatusSpanish[state]}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoomItemAtm;
