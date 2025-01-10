export interface IReservation {
  ClassId: number;
  FlightId: number;
  Id: number;
  Seats: number;
  Total: number;
  UserId: number;
}

export interface IReservationPost {
  FlightId: number | null;
  UserId: number | null;
  ClassId: number | null;
  Seats: number | null;
  Total: number | null;
}
