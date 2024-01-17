"use client";
/** @package */
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

/** @style */
import { useTheme } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const TextFieldAtm = ({
  label,
  width = 150,
  isRequired = false,
}: {
  label: string;
  width?: string | number;
  isRequired?: boolean;
}) => (
  <Box display="flex" alignItems="center" width={width} gap={2}>
    <Typography fontWeight={400} fontSize={15}>
      {label}
      {isRequired && "*"}
    </Typography>
    <TextField sx={{ "& .MuiInputBase-root": { height: "30px" } }}></TextField>
  </Box>
);

const SelectAtm = ({
  label,
  isRequired = false,
  multiple = false,
}: {
  label: string;
  isRequired: boolean;
  multiple?: boolean;
}) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography fontWeight={400} fontSize={15}>
        {label}
        {isRequired && "*"}
      </Typography>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple={multiple}
        value={personName}
        onChange={handleChange}
        renderValue={multiple ? (selected) => selected.join(", ") : undefined}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        sx={{
          width: 250,
          height: 35,
        }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {multiple && <Checkbox checked={personName.indexOf(name) > -1} />}
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const CreateRoomCardMol = () => {
  const theme = useTheme();

  return (
    <Grid
      border="2px solid"
      borderColor={theme.palette.text.secondary}
      borderRadius="20px"
      height={630}
      paddingX={10}
      pt={3}
      width={850}
    >
      <Typography fontWeight={600} fontSize={20}>
        Detalles de la habitacion
      </Typography>
      <Grid container xs={12} mt={4}>
        <Grid item xs={6} container direction="column" gap={3}>
          <TextFieldAtm label="Numero" isRequired />
          <TextFieldAtm label="Rato" />
          <TextFieldAtm label="Amanecida" />
          <SelectAtm label="Adicionales" isRequired multiple />
        </Grid>
        <Grid item xs={6}>
          <TextFieldAtm label="Nombre" />
          <SelectAtm label="Tipo de Habitacion" isRequired multiple />
          <SelectAtm label="Estado Habitacion" isRequired />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateRoomCardMol;
