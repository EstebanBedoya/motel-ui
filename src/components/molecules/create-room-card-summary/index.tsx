/** @package */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

/** @style */
import { useTheme } from "@mui/material";

const CreateRoomCardSummary = () => {
  const theme = useTheme();

  return (
    <Box
      border="2px solid"
      borderColor={theme.palette.text.secondary}
      borderRadius="20px"
      height={410}
      width={600}
    >
      <Grid container xs={12} height="100%">
        <Grid
          alignItems="center"
          container
          direction="column"
          item
          paddingX="10px"
          pt="26px"
          sx={{ borderRight: `2px solid ${theme.palette.text.secondary}` }}
          xs={4}
          gap="75px"
        >
          <Typography
            fontSize={25}
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            Habitacón
          </Typography>
          <Box
            alignItems="center"
            border={4}
            borderColor={theme.palette.primary.main}
            borderRadius={20}
            display="flex"
            height={90}
            justifyContent="center"
            mt={3}
            width={90}
          >
            <Typography
              fontSize={40}
              fontWeight={700}
              color={theme.palette.primary.main}
            >
              01
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} pr="26px" pt="10px" container>
          <Typography fontSize={20} fontWeight={600} ml="26px">
            Detalles de la Habitación
          </Typography>
          <Box ml="26px">
            <ul>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Nombre: <span style={{ fontWeight: "normal" }}>name</span>
              </li>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Tipo de Habitacion:{" "}
                <span style={{ fontWeight: "normal" }}>name</span>
              </li>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Precios: <span style={{ fontWeight: "normal" }}>name</span>
              </li>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Servicios: <span style={{ fontWeight: "normal" }}>name</span>
              </li>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Adicionales: <span style={{ fontWeight: "normal" }}>name</span>
              </li>
              <li style={{ fontSize: "20px", fontWeight: 600 }}>
                Estado Habitación:{" "}
                <span style={{ fontWeight: "normal" }}>name</span>
              </li>
            </ul>
          </Box>
          <Grid container gap={2} justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              sx={{ borderRadius: "20px", height: "28px" }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: "20px", height: "28px" }}
            >
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateRoomCardSummary;
