'use client';

/** @packages */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

type Props = {
  fullWidth?: boolean;
};

const SelectAtm = ({ fullWidth }: Props) => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth={fullWidth} sx={{ minWidth: '50vW' }}>
      <InputLabel id="select-helper-label" sx={{ top: '-7px' }}>
        Filtro de habitaciones
      </InputLabel>
      <Select
        id="select-helper"
        label="Filter Rooms"
        labelId="select-helper-label"
        onChange={handleChange}
        sx={{ height: 40 }}
        value={age}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Sencilla</MenuItem>
        <MenuItem value={2}>Normal</MenuItem>
        <MenuItem value={3}>Zozorrita</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectAtm;
