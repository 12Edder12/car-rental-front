import { Routes } from '@angular/router';

export const reservationRoutes: Routes = [
  {
    path: 'reservation',
    loadComponent: () =>
      import('@features/reservation/reservation.component').then(
        (c) => c.ReservationComponent
      ),
  },
  {
    path: 'my-reservations',
    loadComponent: () =>
      import(
        '@features/reservation/pages/my-reservations/my-reservations.component'
      ).then((c) => c.MyReservationsComponent),
  },
];
