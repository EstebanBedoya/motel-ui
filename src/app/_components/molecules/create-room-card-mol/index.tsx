'use client';

/** @package */
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { forwardRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

/** @style */
import { Divider, useTheme } from '@mui/material';
import { UseFormReturn, useForm } from 'react-hook-form';
import { schema } from './schema';
import SelectAtm from '../../atoms/select-atm';

/** @interfaces */
interface ITextFieldPropsAtm {
  isRequired?: boolean;
  label: string;
  sx?: Record<string, unknown>;
  width?: string | number;
}

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
  additions: (string | undefined)[];
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const TextFieldAtm = forwardRef<HTMLInputElement, ITextFieldPropsAtm>(({
  isRequired = false,
  label,
  sx,
  error,
  width = '150px',
  ...props
}: ITextFieldPropsAtm, ref) => (
  <TextField
    {...props}
    label={label}
    size="small"
    error={!!error}
    helperText={error?.message}
    variant="outlined"
    required={isRequired}
    sx={{
      width,
      ...sx,
    }}
    inputRef={(e) => {
      if (ref && e && typeof ref === 'function') {
        ref(e);
      }
    }}
  />
));

TextFieldAtm.displayName = 'TextField';

// const SelectAtm = ({
//   label,
//   isRequired = false,
//   multiple = false,
// }: {
//   label: string;
//   isRequired: boolean;
//   multiple?: boolean;
// }) => {
//   const [personName, setPersonName] = useState<string[]>([]);
//   const handleChange = (event: SelectChangeEvent<typeof personName>) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(typeof value === 'string' ? value.split(',') : value);
//   };

//   return (
//     <Box sx={{ minWidth: 110, maxWidth: '100%' }}>
//       <FormControl fullWidth size="small" required={isRequired}>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-multiple-checkbox"
//           multiple={multiple}
//           label={label}
//           value={personName}
//           onChange={handleChange}
//           renderValue={multiple ? (selected) => selected.join(', ') : undefined}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 48 * 4.5 + 8,
//               },
//             },
//           }}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               {multiple && <Checkbox checked={personName.indexOf(name) > -1} />}
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

const CreateRoomCardMol = ({
  onSubmit,
}: {
  onSubmit: (data: IFormState) => void;
}) => {
  const theme = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      additions: [],
      name: '',
      type: '',
      longPrice: {
        sunrise: null,
        while: null,
      },
      shortPrice: {
        sunrise: null,
        while: null,
      },
    },
  });

  const onHandleSubmit = (data: IFormState) => {
    onSubmit(data);
    reset();
  };

  return (
    <Grid
      border="2px solid"
      borderColor={theme.palette.text.secondary}
      borderRadius="20px"
      paddingX={3}
      paddingY={2}
      width={600}
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
            label="ID"
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
        <Grid item xs={12} md={6}>
          <SelectAtm
            control={control as unknown as UseFormReturn['control']}
            name="additions"
            rules={{ required: true }}
            label="Servicios adicionales"
            isRequired
            error={errors.additions}
            minWidth="100%"
            multiple
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectAtm
            minWidth="100%"
            label="Tipo de Habitacion"
            isRequired
            error={errors.type}
            control={control as unknown as UseFormReturn['control']}
            name="type"
            rules={{ required: true }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ color: 'red', width: '100%', mt: 1 }} />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-end"
      >
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
  );
};

export default CreateRoomCardMol;
