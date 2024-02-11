/** @packages */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

/** @components */
import ListItemsMol from "@/app/_components/molecules/list-items-mol";

/** @scripts */
import { formatPrice } from "@/utils/format";

interface ActionProps {
  handleClose: () => void;
}

const additional = [
  {
    service: "Bar",
    price: 10000,
  },
  {
    service: "Restaurante",
    price: 20000,
  },
  {
    service: "Lavanderia",
    price: 50000,
  },
];

const services = [
  {
    service: "Rato",
    price: 30000,
  },
  {
    service: "Amanecida",
    price: 60000,
  },
];

const AvailableRoom = {
  Content: () => {
    const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);
    const [serviceSelected, setServiceSelected] = useState<string>(
      services[0].service
    );

    const handleSelectAdditional = (service: string) => {
      if (additionalSelected.includes(service)) {
        setAdditionalSelected((prev) =>
          prev.filter((item) => item !== service)
        );
      } else {
        setAdditionalSelected((prev) => [...prev, service]);
      }
    };

    const handleServiceSelected = (service: string) => {
      setServiceSelected(service);
    };

    return (
      <Grid container xs={12}>
        <Grid container item xs={6} px={2} gap={2} borderRight="2px solid #ccc">
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
              {services.map(({ service, price }) => (
                <Chip
                  key={service}
                  label={`${service}: ${formatPrice(price)}`}
                  color="primary"
                  variant={serviceSelected === service ? "filled" : "outlined"}
                  size="small"
                  onClick={() => handleServiceSelected(service)}
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
                    additionalSelected.includes(service) ? "filled" : "outlined"
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
            <TextField fullWidth multiline rows={2} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <ListItemsMol
            inlineItems
            title="Detalles:"
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
          <Box
            alignItems="center"
            display="flex"
            gap={2}
            justifyContent="center"
            mt={5}
          >
            <Typography fontSize={25} fontWeight={700}>
              Total:{" "}
            </Typography>
            <Typography fontSize={35} fontWeight={700} color="primary">
              {formatPrice(150000)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  },
  Actions: ({ handleClose }: ActionProps) => (
    <Button onClick={handleClose} variant="contained">
      Check in
    </Button>
  ),
};

export default AvailableRoom;
