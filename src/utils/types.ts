export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
}

export interface IRoom {
  id: number;
  type: string;
  state: RoomStatus;
}

export interface IRef {
  name: string;
}

export interface IError {
  message: string;
  ref: IRef;
  type: string;
}

export interface IRulesParams {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
  validate?: (value: string) => boolean;
}
