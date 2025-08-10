import { createAction, props } from '@ngrx/store';
import { Reservation } from '../../models/reservation.model';
import { RegionAvailability, SuggestedRegion } from '../../models/region.model';

export const bookReservation = createAction(
  '[Reservation] Book reservation',
  props<{ reservation: Reservation }>()
);

export const setSuggestedRegions = createAction(
  '[Reservation] Set suggested regions',
  props<{ suggestedRegions: SuggestedRegion[] }>()
);

export const updateRegionsAvailability = createAction(
  '[Reservation] Update regions availability',
  props<{ regionsAvailability: RegionAvailability[] }>()
);



