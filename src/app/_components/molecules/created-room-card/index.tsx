'use client';

/** @package */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/** @style */
import { useMediaQuery, useTheme } from '@mui/material';
import RoomIdAtm from '../../atoms/room-id-atm';
import ListItemsMol from '../list-items-mol';

/** @interfaces */
interface IProps {
  roomId: number;
  name: string | null;
  type: string | null;
  longPrice: {
    while: number;
    sunrise: number;
  };
  shortPrice: {
    while: number;
    sunrise: number;
  };
  additions: number[] | null;
}

const CreatedRoomCard = ({
  roomId,
  name,
  longPrice,
  shortPrice,
  type,
  additions,
}: IProps) => {
  const theme = useTheme();
  const matchMaxWidth = useMediaQuery('(max-width:500px)');

  return (
    <Grid
      border="2px solid"
      borderColor={theme.palette.text.secondary}
      borderRadius="20px"
      paddingRight={matchMaxWidth ? 0 : 3}
      paddingY={1}
      width={600}
      mb={4}
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={4}
        borderBottom={!matchMaxWidth ? 'unset' : '2px solid #ccc'}
        borderRight={matchMaxWidth ? 'unset' : '2px solid #ccc'}
        p={2}
        justifyContent="space-evenly"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          fontSize={25}
          fontWeight={700}
          color={theme.palette.primary.main}
        >
          Habitación
        </Typography>
        <RoomIdAtm
          roomId={roomId}
          color={theme.palette.primary.main}
          sx={{ marginTop: 3 }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <ListItemsMol
          title="Detalles de la habitacion"
          inlineItems
          items={[
            {
              primary: 'Nombre',
              secondary: name || 'No definido',
            },
          ]}
        />
        <ListItemsMol
          title="Precios lunes - viernes"
          inlineItems
          headerSize={18}
          items={[
            {
              primary: 'Rato',
              secondary: shortPrice.while?.toString() || 'No definido',
            },
            {
              primary: 'Amanecida',
              secondary: shortPrice?.sunrise.toString() || 'No definido',
            },
          ]}
        />
        <ListItemsMol
          title="Precios fin de semana"
          inlineItems
          headerSize={18}
          items={[
            {
              primary: 'Rato',
              secondary: longPrice.while?.toString() || 'No definido',
            },
            {
              primary: 'Amanecida',
              secondary: longPrice?.sunrise.toString() || 'No definido',
            },
          ]}
        />
        <ListItemsMol
          title="Extras"
          inlineItems
          headerSize={18}
          items={[
            {
              primary: 'Adicionales',
              secondary: additions?.join(', ') || 'No definido',
            },
            {
              primary: 'Tipo de habitación',
              secondary: type || 'No definido',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default CreatedRoomCard;
