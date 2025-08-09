import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { selectReservations } from '../state/store/reservation.selectors';
import { bookReservation } from '../state/store/reservation.actions';
import { ReservationState } from '../state/models/reservation-state.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private store: Store
  ) { }

  getReservationState$(): Observable<ReservationState> {
    return this.store.select(selectReservations);
  }

  book(reservation: Reservation) {
    this.store.dispatch(bookReservation({reservation}));
  }
}
