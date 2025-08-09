import { createAction, props } from '@ngrx/store';
import { Reservation } from '../../models/reservation.model';
import { SuggestedRegion } from '../../models/region.model';

export const bookReservation = createAction(
  '[Reservation] Book reservation',
  props<{ reservation: Reservation }>()
);

export const setSuggestedRegions = createAction(
  '[Reservation] Set suggested regions',
  props<{ suggestedRegions: SuggestedRegion[] }>()
);



