/** @packages */
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DialogActions, DialogContent, useMediaQuery } from '@mui/material';

/** @components */
import {
  Price, Record, RecordType, Room,
} from '@prisma/client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';
import { trpc } from '@/app/_trpc/client';

/** @scripts */

interface Props {
  inMaintenance: boolean;
  handleClose: () => void;
  roomData: Room & Price
}

const MaintenanceRoom = ({ inMaintenance, handleClose, roomData }: Props) => {
  const { id: roomId, name, type } = roomData;
  const matchMaxWidth = useMediaQuery('(max-width:600px)');
  const [details, setDetails] = useState('');
  const [lastRecord, setLastRecord] = useState<Record>(null);
  const { mutateAsync: startMaintenance } = trpc.records.startMaintenance.useMutation();
  const { mutateAsync: endMaintenance } = trpc.records.endMaintenance.useMutation();
  const { data } = trpc.records.getRecord.useQuery({ roomId, recordType: RecordType.maintenance });

  const handleSave = async () => {
    await startMaintenance({
      roomId,
      startTime: dayjs().toDate(),
      maintenanceDetails: details,
    }, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleEndMaintenance = async () => {
    await endMaintenance({
      roomId,
      endTime: dayjs().toDate(),
    }, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  useEffect(() => {
    if (inMaintenance) {
      setLastRecord(data);
    }
  }, [inMaintenance]);

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
            {inMaintenance ? (
              <Grid item container gap={2} flexDirection="column" width="100%">
                <Typography fontSize={20} fontWeight={700}>
                  Detalles
                </Typography>
                <Typography>
                  {lastRecord?.maintenanceDetails ?? ''}
                </Typography>
              </Grid>
            ) : (
              <Grid item container gap={2} flexDirection="column" width="100%">
                <Grid item>
                  <Typography fontSize={16} fontWeight={700}>
                    Detalles
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={details}
                    onChange={
                      (e) => setDetails(e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            )}
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
          {inMaintenance ? 'Cerrar' : 'Cancelar'}
        </Button>
        <Button onClick={inMaintenance ? handleEndMaintenance : handleSave} variant="contained">
          {inMaintenance ? 'Terminar Manteiniemto' : 'Iniciar Mantenimiento'}
        </Button>
      </DialogActions>
    </>
  );
};

export default MaintenanceRoom;
