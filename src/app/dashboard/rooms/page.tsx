"use client";
/** @package */
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

/** @component */
import SelectAtm from "@/components/atoms/select-atm";
import RoomItemAtm from "@/components/atoms/room-item-atm";

/** @style */
import { useTheme } from "@mui/material";
import CreateRoomCardMol from "@/components/molecules/create-room-card-mol";

enum RoomStates {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
  CLEANING = "cleaning",
}

const mockItems = [
  { id: 101, state: "available", type: "sencilla" },
  { id: 102, state: "occupied", type: "jacuzzi" },
  { id: 103, state: "maintenance", type: "sauna" },
  { id: 104, state: "cleaning", type: "sencilla" },
  { id: 105, state: "available", type: "jacuzzi" },
  { id: 106, state: "occupied", type: "sauna" },
  { id: 107, state: "maintenance", type: "sencilla" },
  { id: 108, state: "cleaning", type: "jacuzzi" },
  { id: 109, state: "available", type: "sauna" },
  { id: 110, state: "occupied", type: "sencilla" },
  { id: 111, state: "maintenance", type: "jacuzzi" },
  { id: 112, state: "cleaning", type: "sauna" },
  { id: 113, state: "available", type: "sencilla" },
  { id: 114, state: "occupied", type: "jacuzzi" },
  { id: 115, state: "maintenance", type: "sauna" },
  { id: 115, state: "maintenance", type: "sauna" },
];

export default function Page() {
  const [tabValue, setTabValue] = useState("all");
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const stateColor =
    {
      [RoomStates.AVAILABLE]: theme.palette.success.main,
      [RoomStates.OCCUPIED]: theme.palette.error.main,
      [RoomStates.MAINTENANCE]: theme.palette.warning.main,
      [RoomStates.CLEANING]: theme.palette.violet.main,
    }[tabValue] ?? theme.palette.primary.main;

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
      <Box
        borderBottom={2}
        borderTop={2}
        borderColor={theme.palette.text.secondary}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: stateColor,
            },
            "& .Mui-selected": {
              color: stateColor,
            },
          }}
        >
          <Tab
            label="Todas"
            value="all"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
          <Tab
            label="Disponibles"
            value={RoomStates.AVAILABLE}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
          <Tab
            label="Ocupadas"
            value={RoomStates.OCCUPIED}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
          <Tab
            label="Limpieza"
            value={RoomStates.CLEANING}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
          <Tab
            label="Mantenimiento"
            value={RoomStates.MAINTENANCE}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
          <Tab
            label="Crear Habitación"
            value="create"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          />
        </Tabs>
      </Box>
      <Grid
        container
        spacing={2}
        mt={5}
        gap={2}
        pl={10}
        pr={10}
        mb={5}
      >
        {/* {mockItems
          .filter((item) => item.state === tabValue || tabValue === "all")
          .map((item, index) => (
            <Grid item key={index} >
              <RoomItemAtm
                roomId={item.id}   
                state={item.state as RoomStates}
                type={item.type.toUpperCase()}
              />
            </Grid>
          ))} */}
          <CreateRoomCardMol />
      </Grid>
    </>
  );
}
