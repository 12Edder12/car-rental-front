// login.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../models/login.interface';
import { Observable, map } from 'rxjs';
import { AuthService } from '@core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authSrv: AuthService = inject(AuthService);

  login(loginData: ILoginRequest): Observable<ILoginResponse> {
    const loginUrl: string = 'https://wcfservices20250110203018.azurewebsites.net/UserService.svc/api/login';
    return this.http.post<ILoginResponse>(loginUrl, loginData).pipe(
      map(response => {
        if (response.GetUserResult) {
          response.GetUserResult.role = 'ADMIN'; // Agregamos el rol ADMIN
        }
        return response;
      })
    );
  }

  logout(): void {
    this.authSrv.removeLoggedUserFromLocalStorage();
  }
}