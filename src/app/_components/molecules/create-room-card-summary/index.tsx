/** @package */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

/** @component */
import { useTheme } from '@mui/material';
import RoomIdAtm from '@/app/_components/atoms/room-id-atm';

/** @style */
import ListItemsMol from '../list-items-mol';

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
          <RoomIdAtm roomId={111} color={theme.palette.primary.main} />
        </Grid>
        <Grid item xs={8} pr="26px" pt="10px" container>
          <ListItemsMol
            title="Detalles:"
            items={[
              {
                primary: 'Nombre',
                secondary: 'name',
              },
              {
                primary: 'Tipo de Habitacion',
                secondary: 'name',
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
                primary: 'Adicionales',
                secondary: 'name',
              },
              {
                primary: 'Estado Habitación',
                secondary: 'name',
              },
            ]}
          />
          <Grid container gap={2} justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              sx={{ borderRadius: '20px', height: '28px' }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: '20px', height: '28px' }}
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
