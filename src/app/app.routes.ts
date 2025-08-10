import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reservation',
    pathMatch: 'full'
  },
  {
    path: 'reservation',
    loadChildren: () => import('./features/reservation/reservation.routes').then(m => m.reservationRoutes)  },
  {
    path: '**',
    redirectTo: 'reservation'
  }
];
