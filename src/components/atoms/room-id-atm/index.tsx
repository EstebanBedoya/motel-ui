/** @package */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  roomId: number;
  color: string;
  sx?: any;
  matchMaxWidth?: boolean;
}

const RoomIdAtm = ({ roomId, matchMaxWidth, color, sx }: Props) => (
  <Box
    alignItems="center"
    border={4}
    borderColor={color}
    borderRadius={20}
    display="flex"
    height={90}
    justifyContent="center"
    mt={3}
    width={90}
  >
    <Typography fontSize={40} fontWeight={700} color={color}>
      {roomId}
    </Typography>
  </Box>
);

export default RoomIdAtm;
