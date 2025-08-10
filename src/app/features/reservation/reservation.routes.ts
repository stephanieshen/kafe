import { Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';

export const reservationRoutes: Routes = [
  {
    path: '',
    component: ReservationComponent,
    children: [
      {
        path: '',
        redirectTo: 'booking-form',
        pathMatch: 'full'
      },
      {
        path: 'booking-form',
        loadComponent: () => import('./pages/booking-form/booking-form.component').then(c => c.BookingFormComponent)
      },
      {
        path: 'completed',
        loadComponent: () => import('./pages/complete-reservation/complete-reservation.component').then(c => c.CompleteReservationComponent)
      }
    ]
  }
];
