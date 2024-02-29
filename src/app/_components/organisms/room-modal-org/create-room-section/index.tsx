'use client';

/** @package */
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

/** @scripts */
import CreateRoomCardMol, { IFormState } from '@/app/_components/molecules/create-room-card-mol';
import { trpc } from '@/app/_trpc/client';
import CreatedRoomCard from '@/app/_components/molecules/created-room-card';
import { RoomStatus } from '@/utils/types';

const CreateRoomSection = () => {
  const matchMaxWidth = useMediaQuery('(max-width:500px)');
  const [addedRoomsList, setAddedRoomsList] = useState<IFormState[]>([]);
  const mutation = trpc.rooms.create.useMutation();

  const onSubmit = async (data: IFormState) => {
    const params = {
      name: data.name,
      id: +data.id,
      type: data.type,
      state: RoomStatus.AVAILABLE,
      shortPrice: {
        weekday: +data.shortPrice.while,
        weekend: +data.shortPrice.sunrise,
      },
      longPrice: {
        weekday: +data.longPrice.while,
        weekend: +data.longPrice.sunrise,
      },
    };

    mutation.mutate(params);

    if (!mutation.error) {
      setAddedRoomsList([...addedRoomsList, data]);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      mt={2}
      display={matchMaxWidth ? '' : 'grid'}
    >
      {addedRoomsList.map((room) => (
        <CreatedRoomCard key={room.id} roomId={+room.id} {...room} />
      ))}
      <CreateRoomCardMol onSubmit={onSubmit} />
    </Grid>
  );
};

export default CreateRoomSection;
