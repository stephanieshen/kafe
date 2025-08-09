import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { selectRegionsAvailability, selectReservations, selectState, selectSuggestedRegions } from '../state/store/reservation.selectors';
import { bookReservation, setSuggestedRegions } from '../state/store/reservation.actions';
import { Region, RegionAvailability, SuggestedRegion } from '../models/region.model';
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

  getRegionsAvailability$(): Observable<RegionAvailability[]> {
    return this.store.select(selectRegionsAvailability);
  }

  getSuggestedRegions$(): Observable<SuggestedRegion[]> {
    return this.store.select(selectSuggestedRegions);
  }

  setSuggestedRegions(reservation: Reservation): void {
    this.filterSuggestedRegions$(reservation)
      .subscribe({
        next: (regionsAvailability) => {
          const suggestedRegions = regionsAvailability.map((regionsAvailability) => {
            const availableCapacity = this.getAvailableCapacity(regionsAvailability, reservation);
            return {
              region: regionsAvailability.region,
              availableSlots: availableCapacity
            }
          });
          this.store.dispatch(setSuggestedRegions({ suggestedRegions }));
        }
      });
  }

  book(reservation: Reservation) {
    this.store.dispatch(bookReservation({reservation}));
  }

  private filterSuggestedRegions$(reservation: Reservation): Observable<RegionAvailability[]> {
    return this.getRegionsAvailability$().pipe(
      map(regionsAvailability => this.filterRegionByPreferences(regionsAvailability, reservation)),
      map(regionsAvailability => this.filterByCapacity(regionsAvailability, reservation))
    )
  }

  private filterRegionByPreferences(
    regionsAvailability: RegionAvailability[], 
    reservation: Reservation
  ): RegionAvailability[] {
    return _filter(regionsAvailability, (availability: RegionAvailability) => {
      const region = availability.region;

      // return if no preference is selected
      if (!reservation.childrenAllowed && !reservation.smokingAllowed) {
        return true;
      }

      return region.isChildrenAllowed === reservation.childrenAllowed ||
              region.isSmokingAllowed === reservation.smokingAllowed
    })
  }

  private filterByCapacity(
    regionsAvailability: RegionAvailability[], 
    reservation: Reservation
  ): RegionAvailability[] {
    return _filter(regionsAvailability, (availability: RegionAvailability) => {
      const availableCapacity = this.getAvailableCapacity(availability, reservation);
      return availableCapacity >= reservation.partySize
    });
  }

  private getAvailableCapacity(
    regionAvailability: RegionAvailability,
    reservation: Reservation
  ): number {
    const reservationDate = dayjs(reservation.date).format('MM-DD-YY');
    const timeslotIndex = regionAvailability.dates[reservationDate].times.indexOf(reservation.timeslot?.value);
    return regionAvailability.dates[reservationDate].capacities[timeslotIndex];
  }
}
