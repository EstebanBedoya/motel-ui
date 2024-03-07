'use client';

/** @package */
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';

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
      additional: data.additions,
      id: +data.id,
      name: data.name,
      state: RoomStatus.AVAILABLE,
      type: data.type.toString(),
      shortPrice: {
        weekday: +data.shortPrice.while,
        weekend: +data.shortPrice.sunrise,
      },
      longPrice: {
        weekday: +data.longPrice.while,
        weekend: +data.longPrice.sunrise,
      },
    };

    mutation.mutate(params, {
      onSuccess: () => {
        setAddedRoomsList([...addedRoomsList, data]);
        toast.success('Habitación creada con éxito');
      },
      onError: () => {
        toast.error('Ha ocurrido un error');
      },
    });
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
