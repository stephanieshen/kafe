import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { selectRegionsAvailability, selectReservations, selectState } from '../state/store/reservation.selectors';
import { bookReservation } from '../state/store/reservation.actions';
import { Region, RegionAvailability } from '../models/region.model';
import { ReservationState } from '../state/models/reservation-state.model';
import { filter as _filter } from 'lodash-es';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private store: Store
  ) { }

  getState$(): Observable<ReservationState> {
    return this.store.select(selectState);
  }
  getReservationState$(): Observable<Reservation[]> {
    return this.store.select(selectReservations);
  }

  getsRegionsAvailability$(): Observable<RegionAvailability[]> {
    return this.store.select(selectRegionsAvailability);
  }

  getSuggestedRegions$(reservation: Reservation): Observable<RegionAvailability[]> {
    return this.getsRegionsAvailability$().pipe(
      map(regionsAvailability => this.filterRegionByPreferences(regionsAvailability, reservation)),
      map(regionsAvailability => this.filterByCapacity(regionsAvailability, reservation))
    )
  }

  book(reservation: Reservation) {
    this.store.dispatch(bookReservation({reservation}));
  }

  private filterRegionByPreferences(
    regionsAvailability: RegionAvailability[], 
    reservation: Reservation
  ): RegionAvailability[] {
    return _filter(regionsAvailability, (availability: RegionAvailability) => {
      const region = availability.region;
      return region.isChildrenAllowed === reservation.childrenAllowed &&
              region.isSmokingAllowed === reservation.smokingAllowed
    })
  }

  private filterByCapacity(
    regionsAvailability: RegionAvailability[], 
    reservation: Reservation
  ): RegionAvailability[] {
    return _filter(regionsAvailability, (availability: RegionAvailability) => {
      const reservationDate = dayjs(reservation.date).format('MM-DD-YY');
      const timeslotIndex = availability.dates[reservationDate].times.indexOf(reservation.timeslot.value);
      const availableCapacity = availability.dates[reservationDate].capacities[timeslotIndex];
      console.log(availableCapacity)
      return availableCapacity >= reservation.partySize
    });
  }
}
