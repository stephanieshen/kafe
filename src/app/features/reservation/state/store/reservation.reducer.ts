import { createReducer, on } from "@ngrx/store";
import { Reservation } from "../../models/reservation.model";
import { bookReservation } from "./reservation.actions";
import { createInitialRegionAvailability } from "../../utils/availability.utils";
import { ReservationState } from "../models/reservation-state.model";

export const initialState: ReservationState = {
  reservations: [] as Reservation[],
  regionAvailability: createInitialRegionAvailability()
}
export const reservationReducer = createReducer(
  initialState,
  on(bookReservation, (state, { reservation }) => ({
    ...state,
    reservations: [...state.reservations, reservation]
  }))
);