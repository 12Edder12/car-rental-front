import { inject, Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILoginResponse } from '../pages/login/models/login.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  canActivate(): boolean {
    const loggedUser = this.authSrv.getLoggedUserFromLocalStorage();
    if (loggedUser?.GetUserResult?.role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/catalog']);
      return false;
    }
  }
}
