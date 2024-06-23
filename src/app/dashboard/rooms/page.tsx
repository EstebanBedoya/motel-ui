'use client';

/** @package */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Room } from '@prisma/client';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

/** @component */
import RoomItemAtm from '@/app/_components/atoms/room-item-atm';
import RoomModalMol from '@/app/_components/organisms/room-modal-org';
import TabsFilterMol, {
  EFilter,
} from '@/app/_components/molecules/tabs-filter-mol';

/** @scripts */
import { trpc } from '@/app/_trpc/client';
import { RoomStatus } from '@/utils/types';

export default function Page() {
  const [tabValue, setTabValue] = useState<EFilter>(EFilter.all);
  const [roomId, setRoomId] = useState<number | null>(null);
  const matchMaxWidth = useMediaQuery('(max-width:500px)');
  const { data: rooms, refetch } = trpc.rooms.listAll.useQuery();

  const filterRooms = rooms?.filter(
    (item: Room) => (item.status as EFilter) === tabValue || tabValue === EFilter.all,
  ) ?? [];

  const handleRoomModalData = (roomIdSelected: number) => {
    setRoomId(roomIdSelected);
  };

  const handleClose = () => {
    setRoomId(null);
    refetch();
  };

  const onChangeTab = (value: EFilter) => {
    setTabValue((prevValue) => {
      if (prevValue === EFilter.create) {
        refetch();
      }
      return value;
    });
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
      </Grid>
      <TabsFilterMol tabValue={tabValue} onChange={onChangeTab} />
      <Grid
        container
        mb={5}
        mt={5}
        justifyItems="center"
        pl={matchMaxWidth ? 3 : 10}
        overflow="auto"
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
      </Grid>
      {roomId && (
        <RoomModalMol
          roomId={roomId}
          handleClose={handleClose}
          open={!!roomId}
        />
      )}
    </>
  );
}
