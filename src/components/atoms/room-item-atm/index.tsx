/** @package */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/** @style */
import { useMediaQuery, useTheme } from "@mui/material";

enum RoomStates {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
  CLEANING = "cleaning",
}

interface Props {
  roomId: number;
  state: RoomStates;
  type: string;
}

const RoomStatesSpanish = {
  [RoomStates.AVAILABLE]: "Disponible",
  [RoomStates.OCCUPIED]: "Ocupada",
  [RoomStates.MAINTENANCE]: "Mantenimiento",
  [RoomStates.CLEANING]: "Limpieza",
};

const RoomItemAtm = ({ 
  roomId, 
  state,
  type 
}: Props) => {
  const theme = useTheme();
  const matchMaxWidth = useMediaQuery('(max-width:500px)');

  const color = {
    [RoomStates.AVAILABLE]: theme.palette.success.main,
    [RoomStates.OCCUPIED]: theme.palette.error.main,
    [RoomStates.MAINTENANCE]: theme.palette.warning.main,
    [RoomStates.CLEANING]: theme.palette.violet.main,
  }[state];

  return (
    <Box
      alignItems="center"
      border={4}
      borderColor={color}
      display="flex"
      flexDirection="column"
      gap={2}
      height={matchMaxWidth ? 200 : 226}
      width={"100%"}
      maxWidth="250px"
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: "5px",
      }}
    >
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
        <Typography fontSize={matchMaxWidth ? 30 : 40} fontWeight={700} color={color}>
          {roomId}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontSize={matchMaxWidth ? 20 : 25} fontWeight={600}>
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
