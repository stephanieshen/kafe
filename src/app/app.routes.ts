import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reservation',
    pathMatch: 'full'
  },
  {
    path: 'reservation',
    loadComponent: () => import('./features/reservation/reservation.component').then(c => c.ReservationComponent)
  },
  {
    path: '**',
    redirectTo: 'reservation'
  }
];
