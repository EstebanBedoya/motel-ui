/** @packages */
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/** @components */
import ListItemsMol from "@/components/molecules/list-items-mol";

/** @scripts */

interface Props {
  inMaintenance: boolean;
}

interface ActionProps extends Props {
  handleClose: () => void;
}

// Este modal va a tener 2 versiones una para cuando se vaya a ingresar a mantenimento y otra para salir de mantenimiento
const MaintenanceRoom = {
  Content: ({ inMaintenance }: Props) => {
    return (
      <Grid container xs={12} height="100%">
        <Grid container item xs={6} px={2} gap={2} borderRight="2px solid #ccc">
          {inMaintenance ? (
            <ListItemsMol
              title="Resumen"
              inlineItems
              items={[
                {
                  primary: "Encagrgado",
                  secondary: "Roberto",
                },
                {
                  primary: "Contacto",
                  secondary: "123456789",
                },
                {
                  primary: "Fecha inicial",
                  secondary: "02 / Marzo / 2024",
                },
                {
                  primary: "Fecha final",
                  secondary: "02 / Marzo / 2024",
                },
                {
                  primary: "Detalles",
                  secondary: "many text",
                },
                {
                  primary: "valor",
                  secondary: "$100.000",
                },
              ]}
            />
          ) : (
            <Grid item container gap={2} flexDirection="column" width="100%">
              <Grid item>
                <Typography fontSize={16} fontWeight={700}>
                  Encargado*
                </Typography>
                <TextField fullWidth size="small" />
              </Grid>
              <Grid item>
                <Typography fontSize={16} fontWeight={700}>
                  Contacto*
                </Typography>
                <TextField fullWidth size="small" />
              </Grid>
              <Grid container item justifyContent="space-between">
                <Grid item>
                  <Typography fontSize={16} fontWeight={700}>
                    Fecha Inicio*
                  </Typography>
                  <TextField size="small" type="date" />
                </Grid>
                <Grid item>
                  <Typography fontSize={16} fontWeight={700}>
                    Fecha Final*
                  </Typography>
                  <TextField size="small" type="date" />
                </Grid>
              </Grid>
              <Grid item>
                <Typography fontSize={16} fontWeight={700}>
                  Valor*
                </Typography>
                <TextField fullWidth size="small" type="number" />
              </Grid>
              <Grid item>
                <Typography fontSize={16} fontWeight={700}>
                  Detalles
                </Typography>
                <TextField fullWidth multiline rows={2} />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <ListItemsMol
            title="Detalles"
            inlineItems
            items={[
              {
                primary: "Nombre",
                secondary: "name",
              },
              {
                primary: "Tipo de Habitacion",
                secondary: "Sencilla",
              },
              {
                primary: "Precios",
                secondary: "name",
              },
              {
                primary: "Servicios",
                secondary: "name",
              },
              {
                primary: "Estado Habitación",
                secondary: "name",
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  },

  Actions: ({ handleClose, inMaintenance }: ActionProps) => (
    <>
      <Button onClick={handleClose} variant="contained" color="error">
        {inMaintenance ? "Cerrar" : "Cancelar"}
      </Button>
      <Button onClick={handleClose} variant="contained">
        {inMaintenance ? "Terminar Manteiniemto" : "Iniciar Mantenimiento"}
      </Button>
    </>
  ),
};

export default MaintenanceRoom;
