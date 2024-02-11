"use client";
/** @package */
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";

/** @style */
import { Divider, useTheme } from "@mui/material";

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
  width = "150px",
  isRequired = false,
  sx,
}: {
  label: string;
  width?: string | number;
  isRequired?: boolean;
  sx?: Record<string, unknown>;
}) => (
  <TextField
    label={label}
    size="small"
    variant="outlined"
    required={isRequired}
    sx={{
      width,
      ...sx,
    }}
  />
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
    <Box sx={{ minWidth: 110, maxWidth: "100%" }}>
      <FormControl fullWidth size="small" required={isRequired}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          label={label}
          value={personName}
          onChange={handleChange}
          renderValue={multiple ? (selected) => selected.join(", ") : undefined}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
              },
            },
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {multiple && <Checkbox checked={personName.indexOf(name) > -1} />}
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      paddingX={3}
      paddingY={2}
      width={600}
      container
      spacing={2}
    >
      <Typography fontWeight={600} fontSize={20} >
        Detalles de la habitacion
      </Typography>
      <Divider sx={{ color: "red", width:"100%", mt: 1}} />
      <Grid item container xs={12} gap={1}>
        <Grid item xs={12} md={6}>
          <TextFieldAtm label="Nombre" width="100%" isRequired />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextFieldAtm label="Precio" width="100%" isRequired />
        </Grid>
      </Grid>
      <Typography fontWeight={600} fontSize={18} pt={1} >
        Precios
      </Typography>
      <Grid item container xs={12} gap={1}>
        <Grid item xs={12} md={6}>
          <TextFieldAtm label="Rato" width="100%" isRequired />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectAtm label="Tipo de Habitacion" isRequired multiple />
        </Grid>
      </Grid>
      <Grid item container xs={12} gap={1}>
        <Grid item xs={12} md={6}>
          <TextFieldAtm label="Amanecida" width="100%" isRequired />
        </Grid>
        <Grid item xs={12} md={5}>
          <SelectAtm label="Estado de Habitacion" isRequired multiple />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} mt={2}>
        <SelectAtm label="Adicionales" isRequired multiple />
      </Grid>
      <Divider sx={{ color: "red", width:"100%", mt: 1}} />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
          }}
        >
          Crear habitacion
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomCardMol;
