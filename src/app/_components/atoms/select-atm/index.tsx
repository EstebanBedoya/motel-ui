'use client';

/** @packages */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import { FieldError, UseFormReturn } from 'react-hook-form';
import { IRulesParams } from '@/utils/types';
import UseControllerCustom from '@/hooks/useControllerCustom';

type Props = {
  control: UseFormReturn['control'];
  fullWidth?: boolean;
  isRequired?: boolean;
  label: string;
  error?: FieldError;
  minWidth?: string;
  multiple?: boolean;
  name: string;
  rules: IRulesParams;
};

const SelectAtm = ({
  control,
  error,
  fullWidth,
  isRequired,
  label,
  minWidth = '50vW',
  multiple,
  name,
  rules,
}: Props) => {
  const { field } = name ? UseControllerCustom(control, name, rules) : { field: null };

  return (
    <FormControl
      error={!!error}
      fullWidth={fullWidth}
      sx={{ minWidth }}
      required={isRequired}
    >
      <InputLabel id="select-helper-label" sx={{ top: '-7px' }}>
        {label || 'labelFiltro de habitaciones'}
      </InputLabel>
      <Select
        id="select-helper"
        label={label}
        labelId="select-helper-label"
        onChange={field?.onChange}
        multiple={multiple}
        ref={field?.ref}
        sx={{ height: 40 }}
        value={multiple ? field?.value || [] : field?.value || ''}
      >
        <MenuItem value={1}>Sencilla</MenuItem>
        <MenuItem value={2}>Normal</MenuItem>
        <MenuItem value={3}>select</MenuItem>
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectAtm;
