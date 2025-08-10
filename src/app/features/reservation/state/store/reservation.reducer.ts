import { createReducer, on } from "@ngrx/store";
import { Reservation } from "../../models/reservation.model";
import { bookReservation, setSuggestedRegions, updateRegionsAvailability } from "./reservation.actions";
import { createInitialRegionAvailability } from "../../utils/availability.utils";
import { ReservationState } from "../models/reservation-state.model";

export const initialState: ReservationState = {
  reservations: [] as Reservation[],
  regionsAvailability: createInitialRegionAvailability(),
  suggestedRegions: []
}
export const reservationReducer = createReducer(
  initialState,
  on(bookReservation, (state, { reservation }) => ({
    ...state,
    reservations: [...state.reservations, reservation]
  })),
  on(setSuggestedRegions, (state, { suggestedRegions }) => ({
    ...state,
    suggestedRegions: [...suggestedRegions]
  })),
  on(updateRegionsAvailability, (state, { regionsAvailability }) => ({
    ...state,
    regionsAvailability: [...regionsAvailability]
  }))
);