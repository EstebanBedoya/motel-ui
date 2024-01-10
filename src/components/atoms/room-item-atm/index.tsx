/** @package */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RoomItemAtm = ({ color = "#00AA07" }: { color?: string }) => {
  return (
    <Box
      alignItems="center"
      border={4}
      borderColor={color}
      display="flex"
      flexDirection="column"
      gap={2}
      height={226}
      width={196}
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
        <Typography fontSize={40} fontWeight={700} color={color}>
          01
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontSize={25} fontWeight={600}>
          SENCILLA
        </Typography>
        <Typography fontSize={20} fontWeight={600} color={color}>
          Disponible
        </Typography>
      </Box>
    </Box>
  );
};

export default RoomItemAtm;
