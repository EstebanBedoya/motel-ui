"use client";

/** @packages */
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChangeEvent, useState } from "react";

/** @styles */
import { useTheme } from "@mui/material/styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  title: string;
  subtitle: string;
};

const DialogMol = ({ open, setOpen, children, title, subtitle }: Props) => {
  if (!open) return;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <Grid
        display="flex"
        alignItems="center"
        pr={3}
        justifyContent="space-between"
      >
        <DialogTitle id="responsive-dialog-title" variant="h3">
          {`${title} - ${subtitle}`}
        </DialogTitle>
        <Chip label="available" color="success" />
      </Grid>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <Divider />
      <DialogActions>
        <Button
          autoFocus
          color="error"
          onClick={handleClose}
          variant="contained"
        >
          <CloseIcon />
        </Button>
        <Button
          autoFocus
          color="success"
          onClick={handleClose}
          variant="contained"
        >
          <CheckIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMol;
