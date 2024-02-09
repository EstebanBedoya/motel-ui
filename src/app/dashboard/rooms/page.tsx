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
import RoomModalMol from "@/components/organisms/room-modal-org";
import { IRoom, RoomStates } from "@/utils/types";
import { colorState } from "@/utils/room";
import CreateRoomCardMol from "@/components/molecules/create-room-card-mol";
import { trpc } from "@/app/_trpc/client";

const mockItems: IRoom[] = [
  { id: 101, state: RoomStates.AVAILABLE, type: "sencilla" },
  { id: 102, state: RoomStates.OCCUPIED, type: "jacuzzi" },
  { id: 103, state: RoomStates.MAINTENANCE, type: "sauna" },
  { id: 104, state: RoomStates.CLEANING, type: "sencilla" },
  { id: 105, state: RoomStates.AVAILABLE, type: "jacuzzi" },
  { id: 106, state: RoomStates.OCCUPIED, type: "sauna" },
  { id: 107, state: RoomStates.MAINTENANCE, type: "sencilla" },
  { id: 108, state: RoomStates.CLEANING, type: "jacuzzi" },
  { id: 109, state: RoomStates.AVAILABLE, type: "sauna" },
  { id: 110, state: RoomStates.OCCUPIED, type: "sencilla" },
  { id: 111, state: RoomStates.MAINTENANCE, type: "jacuzzi" },
  { id: 112, state: RoomStates.CLEANING, type: "sauna" },
  { id: 113, state: RoomStates.AVAILABLE, type: "sencilla" },
  { id: 114, state: RoomStates.OCCUPIED, type: "jacuzzi" },
  { id: 115, state: RoomStates.MAINTENANCE, type: "sauna" },
  { id: 116, state: RoomStates.MAINTENANCE, type: "sauna" },
];

export default function Page() {
  const [tabValue, setTabValue] = useState("all");
  const [roomModalData, setRoomModalData] = useState<IRoom | null>(null);
  const theme = useTheme();

  const getTodos = trpc.rooms.listAll.useQuery();

  console.log(getTodos.data);

  const handleChange = (_: any, newValue: string) => {
    setTabValue(newValue);
  };

  const handleRoomModalData = (roomId: IRoom) => {
    setRoomModalData(roomId);
  };

  const stateColor =
    colorState[tabValue as keyof typeof colorState] ??
    theme.palette.primary.main;

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
      <Grid container spacing={2} mt={5} gap={2} pl={10} pr={10} mb={5}>
        {mockItems
          .filter((item) => item.state === tabValue || tabValue === "all")
          .map((item, index) => (
            <Grid item key={index}>
              <RoomItemAtm
                roomId={item.id}
                state={item.state as RoomStates}
                type={item.type.toUpperCase()}
                onClick={() => handleRoomModalData(item)}
              />
            </Grid>
          ))}
        {tabValue === "create" && (
          <CreateRoomCardMol />
          // <CreateRoomCardSummary />
        )}
      </Grid>
      {roomModalData && (
        <RoomModalMol
          roomData={roomModalData}
          handleClose={() => setRoomModalData(null)}
          open={!!roomModalData}
        />
      )}
    </>
  );
}
