import theme from "@/styles/theme/theme";
import { RoomStates } from "./types";

export const colorState = {
  [RoomStates.AVAILABLE]: theme.palette.success.main,
  [RoomStates.OCCUPIED]: theme.palette.error.main,
  [RoomStates.MAINTENANCE]: theme.palette.warning.main,
  [RoomStates.CLEANING]: theme.palette.violet.main,
};

export const RoomStatesSpanish = {
  [RoomStates.AVAILABLE]: "Disponible",
  [RoomStates.OCCUPIED]: "Ocupada",
  [RoomStates.MAINTENANCE]: "Mantenimiento",
  [RoomStates.CLEANING]: "Limpieza",
};
