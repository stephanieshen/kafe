import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservationState } from "../models/reservation-state.model";

export const selectReservationsState = createFeatureSelector<ReservationState>('reservations');

export const selectReservations = createSelector(
  selectReservationsState,
  (state) => state
);

