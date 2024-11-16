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

  private readonly loggedUser: ILoginResponse =
    this.authSrv.getLoggedUserFromLocalStorage();

  canActivate(): boolean {
    if (this.loggedUser.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
