import dayjs from 'dayjs';
import theme from '@/styles/theme/theme';
import { RoomStatus } from './types';

export const colorState = {
  [RoomStatus.AVAILABLE]: theme.palette.success.main,
  [RoomStatus.OCCUPIED]: theme.palette.error.main,
  [RoomStatus.MAINTENANCE]: theme.palette.warning.main,
  [RoomStatus.CLEANING]: theme.palette.violet.main,
};

export const RoomStatusSpanish = {
  [RoomStatus.AVAILABLE]: 'Disponible',
  [RoomStatus.OCCUPIED]: 'Ocupada',
  [RoomStatus.MAINTENANCE]: 'Mantenimiento',
  [RoomStatus.CLEANING]: 'Limpieza',
};

export const priceSpanish = {
  hourly: 'Rato',
  overnight: 'Amacenida',
};

export const isWeekend = (() => {
  const currentDay = dayjs();

  return currentDay.day() === 5 || currentDay.day() === 6;
})();
