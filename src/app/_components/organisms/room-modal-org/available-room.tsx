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
import { toast } from 'sonner';

/** @components */
import {
  Additionals, Price, RateType, Room,
} from '@prisma/client';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';

/** @scripts */
import { formatPrice } from '@/utils/format';
import { trpc } from '@/app/_trpc/client';
import { isWeekend, priceSpanish } from '@/utils/room';

interface ContentProps {
  roomData: Room & Price;
  handleClose: () => void;
}

// Create a type with the keys of the prices object
const paymentMethods = ['Efectivo', 'Tarjeta', 'Bancolombia', 'Nequi'];

const AvailableRoom = ({ roomData, handleClose }: ContentProps) => {
  const { mutateAsync: checkInRoom } = trpc.records.checkInRoom.useMutation();
  const {
    prices, name, type, additional,
  } = roomData;
  const matchMaxWidth = useMediaQuery('(max-width:600px)');

  const pricesType = Object.keys(prices);

  const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);
  const [serviceSelected, setServiceSelected] = useState<RateType>(
    pricesType[0] as RateType,
  );
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const totalPrice = useMemo(() => {
    const additionalPrice = additionalSelected.reduce(
      // eslint-disable-next-line no-unsafe-optional-chaining
      (acc, service) => acc + additional.find((item: Additionals) => item.name === service)?.price!,
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

  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  const handleCheckIn = async () => {
    await checkInRoom({
      roomId: roomData.id,
      rateType: serviceSelected as RateType,
      instructions,
      paymentMethod,
      additional: additionalSelected.map(
        (item) => additional.find((add: Additionals) => add.name === item)?.id!,
      ),
      isWeekDay: !isWeekend,
      checkIn: new Date(),
    }, {
      onSuccess: () => {
        toast.success('Check in exitoso');
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
              {additional.length ? (

                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  {additional?.map(({ name: nameAdditional, price }: Additionals) => (
                    <Chip
                      key={nameAdditional}
                      label={`${nameAdditional}: ${formatPrice(price)}`}
                      color="info"
                      variant={
                        additionalSelected.includes(nameAdditional)
                          ? 'filled'
                          : 'outlined'
                      }
                      size="small"
                      onClick={() => handleSelectAdditional(nameAdditional)}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2">No hay adicionales</Typography>
              )}
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
            <Box paddingX={2}>
              <Typography fontSize={20} fontWeight={700}>
                Metodo de pago
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                useFlexGap
                flexWrap="wrap"
              >
                {paymentMethods.map((method) => (
                  <Chip
                    key={method}
                    label={method}
                    color="primary"
                    variant={paymentMethod === method ? 'filled' : 'outlined'}
                    size="small"
                    onClick={() => handlePaymentMethod(method)}
                  />
                ))}
              </Stack>
            </Box>
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
