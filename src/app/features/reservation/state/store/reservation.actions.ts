import { createAction, props } from '@ngrx/store';
import { Reservation } from '../../models/reservation.model';

export const bookReservation = createAction(
  'Book reservation',
  props<{ reservation: Reservation }>()
);



