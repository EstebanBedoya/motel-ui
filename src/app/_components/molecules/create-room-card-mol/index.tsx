'use client';

/** @package */
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FieldError, UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

/** @scripts */
import { Price, Room } from '@prisma/client';
import { trpc } from '@/app/_trpc/client';
import { schema } from './schema';

/** @components */
import SelectAtm from '@/app/_components/atoms/select-atm';
import TextFieldAtm from '@/app/_components/atoms/text-field-atm';
import AddServicePopUp, {
  IFormState as IAddService,
} from './add-service-popup';

/** @interfaces */
export interface IFormState {
  name: string;
  longPrice: {
    while: number;
    sunrise: number;
  };
  shortPrice: {
    while: number;
    sunrise: number;
  };
  id: string;
  type: string;
  additions: number[];
}

interface Props {
  onSubmit: (data: IFormState) => void;
  isEdit?: boolean;
  editData?: Room & Price;
}

const CreateRoomCardMol = ({ onSubmit, isEdit = false, editData }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { data: additional, refetch } = trpc.additional.listAll.useQuery();
  const mutation = trpc.additional.create.useMutation();

  console.log(editData);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IFormState>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      additions: editData?.additional ?? [],
      name: editData?.name ?? '',
      type: editData?.type ?? '',
      id: editData?.id ?? '',
      longPrice: {
        sunrise: editData?.prices?.hourly?.weekend ?? null,
        while: editData?.prices?.overnight?.weekend ?? null,
      },
      shortPrice: {
        sunrise: editData?.prices?.hourly?.weekday ?? null,
        while: editData?.prices?.overnight?.weekday ?? null,
      },
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onAddService = (data: IAddService) => {
    const params = {
      name: data.name,
      price: +data.price,
    };

    mutation.mutate(params, {
      onSuccess: () => {
        refetch();
        toast.success('Servicio creado con éxito');
        handleClose();
      },
      onError: () => {
        toast.error('Ha ocurrido un error');
      },
    });
  };

  const onHandleSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <>
      <Grid
        border={!isEdit ? '2px solid' : 'unset'}
        borderColor={theme.palette.text.secondary}
        borderRadius={!isEdit ? '20px' : undefined}
        paddingX={3}
        paddingY={2}
        p={isEdit ? 5 : undefined}
        width={!isEdit ? 600 : undefined}
        container
        spacing={2}
      >
        <Typography fontWeight={600} fontSize={20}>
          Detalles de la habitacion
        </Typography>
        <Divider sx={{ color: 'red', width: '100%', mt: 1 }} />
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.id}
              isRequired
              type="number"
              label="Numero de habitación"
              width="100%"
              {...register('id')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.name}
              isRequired
              label="Nombre"
              width="100%"
              {...register('name')}
            />
          </Grid>
        </Grid>
        <Typography fontWeight={600} fontSize={18} pt={1}>
          Precios
        </Typography>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Lunes - viernes
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.shortPrice?.while}
              isRequired
              label="Rato"
              width="100%"
              type="number"
              {...register('shortPrice.while')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.shortPrice?.sunrise}
              isRequired
              label="Amanecida"
              type="number"
              width="100%"
              {...register('shortPrice.sunrise')}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Fin de semana
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.longPrice?.while}
              isRequired
              label="Rato"
              type="number"
              width="100%"
              {...register('longPrice.while')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldAtm
              error={errors.longPrice?.sunrise}
              isRequired
              type="number"
              label="Amanecida"
              width="100%"
              {...register('longPrice.sunrise')}
            />
          </Grid>
        </Grid>
        <Typography fontWeight={600} fontSize={18} pt={1}>
          Extras
        </Typography>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={11} md={5}>
            <SelectAtm
              control={control as unknown as UseFormReturn['control']}
              name="additions"
              rules={{ required: true }}
              label="Servicios adicionales"
              isRequired
              items={additional}
              error={errors.additions as FieldError}
              minWidth="100%"
              multiple
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Insertar adicional">
              <IconButton onClick={() => setOpen(true)}>
                <AddBoxIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectAtm
              minWidth="100%"
              label="Tipo de Habitacion"
              isRequired
              error={errors.type}
              control={control as unknown as UseFormReturn['control']}
              name="type"
              items={[
                { id: 101, type: 'sencilla', name: 'secilla' },
                { id: 102, type: 'jacuzzi', name: 'Especial Name' },
                { id: 103, type: 'sauna', name: 'Especial Name' },
                { id: 104, type: 'sencilla', name: 'secilla' },
                { id: 105, type: 'jacuzzi', name: 'Especial Name' },
                { id: 106, type: 'sauna', name: 'Especial Name' },
                { id: 107, type: 'sencilla', name: 'secilla' },
              ]}
              rules={{ required: true }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ color: 'red', width: '100%', mt: 1 }} />
        <Grid item container justifyContent="center" alignItems="flex-end">
          <Button
            variant="contained"
            sx={{
              borderRadius: '20px',
            }}
            onClick={handleSubmit(onHandleSubmit)}
          >
            Crear habitacion
          </Button>
        </Grid>
      </Grid>
      {open && (
        <AddServicePopUp
          handleClose={handleClose}
          onSubmit={onAddService}
          open={open}
        />
      )}
    </>
  );
};

export default CreateRoomCardMol;
