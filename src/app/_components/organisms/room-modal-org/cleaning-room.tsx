/** @packages */
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';

/** @components */
import Button from '@mui/material/Button';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';

/** @scripts */

const CleaningRoom = {
  Content: () => {
    const matchMaxWidth = useMediaQuery('(max-width:600px)');

    return (
      <Grid container xs={12} height="100%">
        <Grid
          borderBottom={!matchMaxWidth ? 'unset' : '2px solid #ccc'}
          borderRight={matchMaxWidth ? 'unset' : '2px solid #ccc'}
          container
          gap={2}
          item
          md={6}
          pb={2}
          px={2}
          sm={6}
          xs={12}
        >
          <ListItemsMol
            title="Detalles de la limpieza"
            inlineItems
            items={[
              {
                primary: 'Tiempo aprox',
                secondary: '30 minutos',
              },
              {
                primary: 'Encargado',
                secondary: 'Marta',
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ListItemsMol
            title="Detalles"
            inlineItems={!matchMaxWidth}
            items={[
              {
                primary: 'Nombre',
                secondary: 'name',
              },
              {
                primary: 'Tipo de Habitacion',
                secondary: 'Sencilla',
              },
              {
                primary: 'Precios',
                secondary: 'name',
              },
              {
                primary: 'Servicios',
                secondary: 'name',
              },
              {
                primary: 'Estado Habitación',
                secondary: 'name',
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
