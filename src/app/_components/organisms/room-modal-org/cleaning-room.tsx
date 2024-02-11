/** @packages */
import Grid from "@mui/material/Grid";

/** @components */
import ListItemsMol from "@/app/_components/molecules/list-items-mol";

/** @scripts */
import Button from "@mui/material/Button";

const CleaningRoom = {
  Content: () => {
    return (
      <Grid container xs={12} height="100%">
        <Grid
          container
          item
          xs={6}
          px={2}
          gap={2}
          borderRight="2px solid #ccc"
        >
          <ListItemsMol
            title="Detalles de la limpieza"
            inlineItems
            items={[
              {
                primary: "Tiempo aprox",
                secondary: "30 minutos",
              },
              {
                primary: "Encargado",
                secondary: "Marta",
              },
            ]}
          />
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

  Actions: ({ handleClose }: { handleClose: () => void }) => (
    <>
      <Button onClick={handleClose} variant="contained" color="error">
        Cerrar
      </Button>
      <Button onClick={handleClose} variant="contained">
        Terminar Limpieza
      </Button>
    </>
  ),
};

export default CleaningRoom;
