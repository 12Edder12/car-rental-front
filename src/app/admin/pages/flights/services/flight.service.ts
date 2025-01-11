import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://wcfservices20250110203018.azurewebsites.net/FlightService.svc/api';

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.baseUrl);
  }
}