import { inject, Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { ILoginResponse } from '../pages/login/models/login.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly router: Router = inject(Router);
  private readonly authSrv: AuthService = inject(AuthService);

  canActivate(): boolean {
    const loggedUser = this.authSrv.getLoggedUserFromLocalStorage();
    if (loggedUser?.GetUserResult?.Status) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}