import { Routes } from '@angular/router';
import { authRoutes } from '@core/auth/auth.routes';
import { catalogRoutes } from '@features/catalog/catalog.routes';
import { vehicleDeatilRoutes } from '@features/vehicle-detail/vehicle-detail.routes';
import { authRoutesAdmin } from './admin/auth.routes';
import { returnRoutes } from '@features/returns/returns.routes';

export const routes: Routes = [
  ...authRoutes,
  ...catalogRoutes,
  ...returnRoutes,
  ...vehicleDeatilRoutes,
  ...authRoutesAdmin,
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
