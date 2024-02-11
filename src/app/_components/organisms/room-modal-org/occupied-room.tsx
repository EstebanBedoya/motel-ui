/** @packages */
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";

/** @components */
import ListItemsMol from "@/app/_components/molecules/list-items-mol";

/** @scripts */
import { formatPrice } from "@/utils/format";
import Button from "@mui/material/Button";

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

const OccupiedRoom = {
  Content: () => {
    const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);

    const handleSelectAdditional = (service: string) => {
      if (additionalSelected.includes(service)) {
        setAdditionalSelected((prev) =>
          prev.filter((item) => item !== service)
        );
      } else {
        setAdditionalSelected((prev) => [...prev, service]);
      }
    };

    return (
      <Grid container xs={12}>
        <Grid container item xs={6} px={2} gap={2} borderRight="2px solid #ccc">
          <ListItemsMol
            title="Facturación:"
            items={[
              {
                primary: "Tiempo",
                secondary: "Rato = $30.000",
              },
              {
                primary: "Extensiones",
                secondary: "3 = $30.000",
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
        <Grid item xs={6}>
          <ListItemsMol
            title="Detalles:"
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

  Actions: ({ handleClose }: { handleClose: () => void }) => (
    <>
      {/* Si se adiciona algun adicional, este boton deberia cambiar de color y texto, en su defecto de funcionalidad */}
      <Button onClick={handleClose} variant="contained" color="warning">
        Check out
      </Button>
      <Button onClick={handleClose} variant="contained">
        Extender
      </Button>
    </>
  ),
};

export default OccupiedRoom;
