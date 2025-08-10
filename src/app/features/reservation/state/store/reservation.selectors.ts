import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservationState } from "../models/reservation-state.model";

export const selectReservationsState = createFeatureSelector<ReservationState>('reservation');

export const selectState = createSelector(
  selectReservationsState,
  (state) => state
);

export const selectReservations = createSelector(
  selectReservationsState,
  (state) => state.reservations
);

export const selectRegionsAvailability = createSelector(
  selectReservationsState,
  (state) => state.regionsAvailability
);

export const selectSuggestedRegions = createSelector(
  selectReservationsState,
  (state) => state.suggestedRegions
);


