import { RegionAvailability, SuggestedRegion } from "../../models/region.model";
import { Reservation } from "../../models/reservation.model";

export interface ReservationState {
  reservations: Reservation[];
  regionsAvailability: RegionAvailability[];
  suggestedRegions: SuggestedRegion[];
}
