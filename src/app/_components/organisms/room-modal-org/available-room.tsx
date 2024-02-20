/** @packages */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DialogActions, DialogContent, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

/** @components */
import { Price, RateType, Room } from '@prisma/client';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';

/** @scripts */
import { formatPrice } from '@/utils/format';
import { trpc } from '@/app/_trpc/client';

interface ContentProps {
  roomData: Room & Price;
  handleClose: () => void;
}

const additional = [
  {
    service: 'Bar',
    price: 10000,
  },
  {
    service: 'Restaurante',
    price: 20000,
  },
  {
    service: 'Lavanderia',
    price: 50000,
  },
];

const priceSpanish = {
  hourly: 'Rato',
  overnight: 'Amacenida',
};

const AvailableRoom = ({ roomData, handleClose }: ContentProps) => {
  const { mutate: checkInRoom } = trpc.records.checkInRoom.useMutation();
  const { prices, name, type } = roomData;
  const matchMaxWidth = useMediaQuery('(max-width:600px)');
  const currentDay = dayjs();

  const isWeekend = currentDay.day() === 0 || currentDay.day() === 6;
  const pricesType = Object.keys(prices);

  const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);
  const [serviceSelected, setServiceSelected] = useState<RateType>(
    pricesType[0] as RateType,
  );
  const [instructions, setInstructions] = useState('');

  const totalPrice = useMemo(() => {
    const additionalPrice = additionalSelected.reduce(
      // eslint-disable-next-line no-unsafe-optional-chaining
      (acc, service) => acc + additional.find((item) => item.service === service)?.price!,
      0,
    );

    return (
      (isWeekend
        ? prices[serviceSelected].weekend
        : prices[serviceSelected].weekday) + additionalPrice
    );
  }, [additionalSelected, prices, serviceSelected]);

  const handleSelectAdditional = (service: string) => {
    if (additionalSelected.includes(service)) {
      setAdditionalSelected((prev) => prev.filter((item) => item !== service));
    } else {
      setAdditionalSelected((prev) => [...prev, service]);
    }
  };

  const handleServiceSelected = (service: RateType) => {
    setServiceSelected(service);
  };

  const handleCheckIn = () => {
    checkInRoom({
      roomId: roomData.id,
      rateType: serviceSelected as RateType,
      instructions,
      additional: additionalSelected.map(
        (item) => additional.find((add) => add.service === item)?.price!,
      ),
      isWeekDay: !isWeekend,
      checkIn: new Date(),
    });
    handleClose();
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container xs={12}>
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
            <Grid item>
              <Typography fontSize={20} fontWeight={700}>
                Seleccione el servicio*
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                useFlexGap
                flexWrap="wrap"
              >
                {pricesType.map((price) => (
                  <Chip
                    key={price}
                    label={`${
                      priceSpanish[price as keyof typeof priceSpanish]
                    }: ${formatPrice(
                      isWeekend ? prices[price].weekday : prices[price].weekday,
                    )}`}
                    color="primary"
                    variant={serviceSelected === price ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => handleServiceSelected(price as RateType)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item>
              <Typography fontSize={20} fontWeight={700}>
                Adicionales
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                useFlexGap
                flexWrap="wrap"
              >
                {additional.map(({ service, price }) => (
                  <Chip
                    key={service}
                    label={`${service}: ${formatPrice(price)}`}
                    color="info"
                    variant={
                      additionalSelected.includes(service)
                        ? 'filled'
                        : 'outlined'
                    }
                    size="small"
                    onClick={() => handleSelectAdditional(service)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item width="100%">
              <Typography fontSize={20} fontWeight={700}>
                Instrucciones
              </Typography>
              <TextField
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ListItemsMol
              inlineItems={!matchMaxWidth}
              title="Detalles:"
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
            <Box
              alignItems="center"
              display="flex"
              gap={2}
              justifyContent="center"
              mt={5}
            >
              <Typography fontSize={25} fontWeight={700}>
                Total:
                {' '}
              </Typography>
              <Typography fontSize={35} fontWeight={700} color="primary">
                {formatPrice(totalPrice)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: ' center' }}>
        <Button onClick={handleCheckIn} variant="contained">
          Check in
        </Button>
      </DialogActions>
    </>
  );
};

export default AvailableRoom;
