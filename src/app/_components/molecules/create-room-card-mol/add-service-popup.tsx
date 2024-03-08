/* @packages */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/** @scripts */
import { Typography } from '@mui/material';
import { addServiceSchema } from './schema';

/** @components */
import TextFieldAtm from '@/app/_components/atoms/text-field-atm';

/** @interfaces */
export interface IFormState {
  name: string;
  price: number;
}

interface IAddServicePopUpProps {
  handleClose: () => void;
  onSubmit: (data: IFormState) => void;
  open: boolean;
}

const AddServicePopUp = ({
  handleClose,
  onSubmit,
  open,
} : IAddServicePopUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormState>({
    resolver: zodResolver(addServiceSchema),
  });

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          width: '30vw',
        },
      }}
    >
      <DialogTitle>
        <Typography fontWeight={600} fontSize={20}>
          Añadir servicio
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} p={2} pt={1}>
          <TextFieldAtm
            error={errors.name}
            isRequired
            label="Servicio"
            width="100%"
            {...register('name')}
          />
        </Grid>
        <Grid item xs={12} p={2} pt={1}>
          <TextFieldAtm
            error={errors.price}
            isRequired
            label="Precio"
            type="number"
            width="100%"
            {...register('price')}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddServicePopUp;
