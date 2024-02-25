/** @packages */
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';

/** @components */
import Button from '@mui/material/Button';
import { DialogActions, DialogContent, useMediaQuery } from '@mui/material';
import { Price, RecordType, Room } from '@prisma/client';
import dayjs from 'dayjs';
import ListItemsMol from '@/app/_components/molecules/list-items-mol';

/** @scripts */
import { formatPrice } from '@/utils/format';
import { trpc } from '@/app/_trpc/client';
import { priceSpanish } from '@/utils/room';

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

interface ContentProps {
  roomData: Room & Price;
  handleClose: () => void;
}

const OccupiedRoom = ({ roomData, handleClose }: ContentProps) => {
  const { name, type } = roomData;
  const { data: record } = trpc.records.getRecord.useQuery({
    roomId: roomData.id,
    recordType: RecordType.occupied,
  });
  const { mutate: checkout } = trpc.records.checkOutRoom.useMutation();
  const matchMaxWidth = useMediaQuery('(max-width:600px)');

  const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);

  const handleSelectAdditional = (service: string) => {
    if (additionalSelected.includes(service)) {
      setAdditionalSelected((prev) => prev.filter((item) => item !== service));
    } else {
      setAdditionalSelected((prev) => [...prev, service]);
    }
  };

  const totalPrice = useMemo(() => {
    const additionalPrice = additionalSelected.reduce(
      // eslint-disable-next-line no-unsafe-optional-chaining
      (acc, service) => acc + additional.find((item) => item.service === service)?.price!,
      0,
    );

    return (record?.priceRate ?? 0) + additionalPrice;
  }, [additionalSelected]);

  const handleCheckout = () => {
    checkout({
      roomId: roomData.id,
      endTime: dayjs().toDate(),
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
            <ListItemsMol
              inlineItems
              title="Facturación:"
              items={[
                {
                  primary: priceSpanish[record?.rateType as keyof typeof priceSpanish],
                  secondary: formatPrice(record?.priceRate ?? 0),
                },
              ]}
            />
            <Grid item>
              <Typography fontSize={20} fontWeight={700}>
                Adicionales
              </Typography>
              {/* La idea es que los adcicionbales ya seleccionados queden en disabled */}
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
                    color="primary"
                    variant="filled"
                    disabled
                    size="small"
                    onClick={() => handleSelectAdditional(service)}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ListItemsMol
              title="Detalles:"
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
      <DialogActions>
        <Button onClick={handleCheckout} variant="contained" color="warning">
          Check out
        </Button>
        <Button onClick={handleClose} variant="contained">
          Extender
        </Button>
      </DialogActions>
    </>
  );
};

export default OccupiedRoom;
