"use client";
/** @package */
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

/** @component */
import SelectAtm from "@/components/atoms/select-atm";

/** @scripts */
import Box from "@mui/material/Box";
import RoomItemAtm from "@/components/atoms/room-item-atm";

export default function Page() {
  const [value, setValue] = useState(0);
  const items = Array.from({ length: 10 }, (_, index) => index);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        mt={5}
        mb={5}
        gap={5}
      >
        <Typography variant="h1" fontWeight={700} fontSize={35}>
          Habitaciones
        </Typography>
        <SelectAtm />
      </Grid>
      <Box borderBottom={2} borderTop={2} borderColor="#0000004D">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Todas" />
          <Tab label="Disponibles" />
          <Tab label="Ocupadas" />
          <Tab label="Limpieza" />
          <Tab label="Mantenimiento" />
          <Tab label="Crear Habitación" />
        </Tabs>
      </Box>
      <Grid container gap={2} mt={5} pl={10} pr={10}>
        {items.map((item, index) => (
          <Grid item key={index}>
            <RoomItemAtm />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
