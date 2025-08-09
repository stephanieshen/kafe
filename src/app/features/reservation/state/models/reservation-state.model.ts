import { RegionAvailability } from "../../models/region.model";
import { Reservation } from "../../models/reservation.model";

export interface ReservationState {
  reservations: Reservation[];
  regionAvailability: RegionAvailability[];
}
