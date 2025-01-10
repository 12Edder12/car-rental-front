import { Routes } from '@angular/router';

export const reservationRoutes: Routes = [
  {
    path: 'reservation',
    loadComponent: () =>
      import('@features/reservation/reservation.component').then(
        (c) => c.ReservationComponent
      ),
  },
];
