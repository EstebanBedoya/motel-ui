/** @package */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/** @component */
import RoomIdAtm from "../room-id-atm";
import { RoomStates } from "@/utils/types";
import { RoomStatesSpanish, colorState } from "@/utils/room";

interface Props {
  roomId: number;
  state: RoomStates;
  type: string;
  onClick?: () => void;
}

const RoomItemAtm = ({ roomId, state, type, onClick }: Props) => {
  const color = colorState[state];

  return (
    <Box
      alignItems="center"
      border={4}
      borderColor={color}
      display="flex"
      flexDirection="column"
      gap={2}
      height={226}
      onClick={onClick}
      width={196}
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        cursor: "pointer",
      }}
    >
      <RoomIdAtm roomId={roomId} color={color} sx={{ marginTop: 3 }} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontSize={25} fontWeight={600}>
          {type}
        </Typography>
        <Typography fontSize={20} fontWeight={600} color={color}>
          {RoomStatesSpanish[state]}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoomItemAtm;
