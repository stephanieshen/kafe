import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { selectRegionsAvailability, selectReservations, selectState, selectSuggestedRegions } from '../state/store/reservation.selectors';
import { bookReservation, setSuggestedRegions, updateRegionsAvailability } from '../state/store/reservation.actions';
import { RegionAvailability, SuggestedRegion } from '../models/region.model';
import { ReservationState } from '../state/models/reservation-state.model';
import { filter as _filter, cloneDeep, find } from 'lodash-es';
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

  getUpdatedRegionsAvailability$(reservation: Reservation): Observable<RegionAvailability[]> {
    return this.getRegionsAvailability$().pipe(
      take(1), 
      map((regionsAvailability) => {
        const regionsAvailabilityState = cloneDeep(regionsAvailability);
        const regionToUpdate = find(regionsAvailabilityState, ['region.id', reservation.region.id]);
        const reservationDate = dayjs(reservation.date).format('MM-DD-YY');
        const timeslotIndex = regionToUpdate?.dates[reservationDate].times.indexOf(reservation.timeslot?.value);

        if (regionToUpdate && timeslotIndex !== undefined) {
          regionToUpdate.dates[reservationDate].capacities[timeslotIndex] -= reservation.partySize;
        }

        return regionsAvailabilityState;
      })
    );
  }

  book(reservation: Reservation): Observable<void> {
    return this.getUpdatedRegionsAvailability$(reservation).pipe(
      map((regionsAvailability) => {
        this.store.dispatch(bookReservation({ reservation }));
        this.store.dispatch(updateRegionsAvailability({ regionsAvailability }));
      })
    );
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
