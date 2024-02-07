"use client";
/** @package */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

/** @component */
import SelectAtm from "@/components/atoms/select-atm";
import RoomItemAtm from "@/components/atoms/room-item-atm";

/** @style */
import CreateRoomCardMol from "@/components/molecules/create-room-card-mol";
import CreateRoomCardSummary from "@/components/molecules/create-room-card-summary";

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
  { id: 116, state: "maintenance", type: "sauna" },
];

export default function Page() {
  const [tabValue, setTabValue] = useState("all");
  const theme = useTheme();
  const matchMaxWidth = useMediaQuery('(max-width:500px)');

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
        sx={{
          justifyContent: "center",
            display: "flex",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: !matchMaxWidth ? stateColor : "unset",
            },
            "& .Mui-selected": {
              color: stateColor,
            },
            '& .MuiTabs-flexContainer': {
              overflowY: 'auto',
              display: "block",

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
        mb={5}
        mt={5} 
        justifyItems="center"
        pl={matchMaxWidth ? 3 : 10} 
        pr={matchMaxWidth ? 3 : 10} 
      >
        {mockItems
          .filter((item) => item.state === tabValue || tabValue === "all")
          .map((item, index) => (
            <Grid 
              item 
              container
              key={index}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={1.5}
            >
              <RoomItemAtm
                roomId={item.id}
                state={item.state as RoomStates}
                type={item.type.toUpperCase()}
              />
            </Grid>
          ))}
        {tabValue === "create" && (
          <CreateRoomCardMol />
          // <CreateRoomCardSummary />
        )}
      </Grid>
    </>
  );
}
