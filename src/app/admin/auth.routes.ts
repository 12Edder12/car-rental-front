import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const authRoutesAdmin: Routes = [

    {
        path: 'flights',
        loadComponent: () =>
          import('./pages/flights/flight.component').then(
            (c) => c.FlightComponent
          ),
          canActivate: [AuthGuard],
      },
];
