/** @packages */
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'sonner';

/** @components */
import Button from '@mui/material/Button';
import { DialogActions, useMediaQuery } from '@mui/material';
import { Price, Room } from '@prisma/client';
import dayjs from 'dayjs';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';
import { trpc } from '@/app/_trpc/client';

/** @scripts */

interface Props {
  handleClose: () => void;
  roomData: Room & Price;
}

const CleaningRoom = ({ roomData, handleClose }: Props) => {
  const { name, type } = roomData;
  const matchMaxWidth = useMediaQuery('(max-width:600px)');
  const { mutateAsync: endCleaning } = trpc.records.endCleaning.useMutation();

  const handleEndCleaning = async () => {
    await endCleaning({ roomId: roomData.id, endTime: dayjs().toDate() }, {
      onSuccess: () => {
        toast.success('Limpieza terminada');
        handleClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <DialogContent dividers>
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
                  secondary: name,
                },
                {
                  primary: 'Tipo de Habitacion',
                  secondary: type,
                },
              ]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cerrar
        </Button>
        <Button onClick={handleEndCleaning} variant="contained">
          Terminar Limpieza
        </Button>
      </DialogActions>
    </>
  );
};

export default CleaningRoom;
