'use client';

/** @package */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

/** @component */
import { Room } from '@prisma/client';
import SelectAtm from '@/app/_components/atoms/select-atm';
import RoomItemAtm from '@/app/_components/atoms/room-item-atm';
import CreateRoomCardMol from '@/app/_components/molecules/create-room-card-mol';
import RoomModalMol from '@/app/_components/organisms/room-modal-org';

/** @scripts */
import { RoomStatus } from '@/utils/types';
import TabsFilterMol, {
  EFilter,
} from '@/app/_components/molecules/tabs-filter-mol';
import { trpc } from '@/app/_trpc/client';

export default function Page() {
  const [tabValue, setTabValue] = useState<EFilter>(EFilter.all);
  const [roomId, setRoomId] = useState<number | null>(null);
  const matchMaxWidth = useMediaQuery('(max-width:500px)');
  const { data: rooms } = trpc.rooms.listAll.useQuery();

  const filterRooms = rooms?.filter(
    (item: Room) => (item.status as EFilter) === tabValue || tabValue === EFilter.all,
  ) ?? [];

  const handleRoomModalData = (roomIdSelected: number) => {
    setRoomId(roomIdSelected);
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
      <TabsFilterMol tabValue={tabValue} onChange={setTabValue} />
      <Grid
        container
        mb={5}
        mt={5}
        justifyItems="center"
        pl={matchMaxWidth ? 3 : 10}
        pr={matchMaxWidth ? 3 : 10}
      >
        {filterRooms.map((item: Room) => (
          <Grid
            item
            container
            key={item.id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={1.5}
          >
            <RoomItemAtm
              roomId={item.id}
              status={item.status as RoomStatus}
              type={item.type.toUpperCase()}
              onClick={() => handleRoomModalData(item.id)}
            />
          </Grid>
        ))}
        {tabValue === EFilter.create && (
          <CreateRoomCardMol />
          // <CreateRoomCardSummary />
        )}
      </Grid>
      {roomId && (
        <RoomModalMol
          roomId={roomId}
          handleClose={() => setRoomId(null)}
          open={!!roomId}
        />
      )}
    </>
  );
}
