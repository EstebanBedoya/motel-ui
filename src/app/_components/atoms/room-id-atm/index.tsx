/** @package */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  roomId: number;
  color: string;
  sx?: any;
}

const RoomIdAtm = ({ roomId, color, sx }: Props) => (
  <Box
    alignItems="center"
    border={4}
    borderColor={color}
    borderRadius={20}
    display="flex"
    height={90}
    justifyContent="center"
    width={90}
    sx={sx}
  >
    <Typography fontSize={40} fontWeight={700} color={color}>
      {roomId}
    </Typography>
  </Box>
);

export default RoomIdAtm;
