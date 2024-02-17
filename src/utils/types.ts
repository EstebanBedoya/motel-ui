export enum RoomStatus {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
  CLEANING = "cleaning",
}

export interface IRoom {
  id: number;
  type: string;
  state: RoomStatus;
}
