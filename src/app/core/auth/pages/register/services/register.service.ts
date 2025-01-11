import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegisterRequest } from '../models/register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://wcfservices20250110203018.azurewebsites.net/UserService.svc/api'; 

  register(registerData: IRegisterRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    return this.http.post<any>(this.baseUrl, registerData, { headers });
  }
}
