import { Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

export const authRoutesAdmin: Routes = [

    {
        path: 'vehicles',
        loadComponent: () =>
          import('./pages/flights/flight.component').then(
            (c) => c.FlightComponent
          ),
          canActivate: [AuthGuard],
      }, 
      {
        path: 'admin',
        loadComponent: () =>
          import('../admin/admin.component').then(
            (c) => c.AdminComponent
          ),
          canActivate: [AuthGuard],
      },
];
