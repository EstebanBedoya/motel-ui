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
  width = "150px",
  isRequired = false,
}: {
  label: string;
  width?: string | number;
  isRequired?: boolean;
}) => (
  <TextField
    label={label}
    size="small"
    variant="outlined"
    required={isRequired}
    sx={{
      width,
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
      height={410}
      paddingX={7}
      paddingY={3}
      width={600}
      container
    >
      <Typography fontWeight={600} fontSize={20}>
        Detalles de la habitacion
      </Typography>
      <Grid container xs={12}>
        <Grid item xs={6} container direction="column" gap={3}>
          <TextFieldAtm label="Numero" isRequired />
          <Box>
            <Typography fontWeight={700} fontSize={15}>
              Precios*
            </Typography>
            <Box
              borderColor={theme.palette.text.secondary}
              borderRadius={2}
              display="flex"
              flexDirection="column"
              gap={1}
              paddingY={1}
            >
              <TextFieldAtm label="Rato" isRequired />
              <TextFieldAtm label="Amanecida" isRequired />
            </Box>
          </Box>
          <SelectAtm label="Adicionales" isRequired multiple />
        </Grid>
        <Grid item xs={6} container direction="column" gap={3}>
          <TextFieldAtm label="Nombre" width={240} />
          <SelectAtm label="Tipo de Habitacion" isRequired multiple />
          <SelectAtm label="Estado Habitacion" isRequired />
        </Grid>
      </Grid>
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
