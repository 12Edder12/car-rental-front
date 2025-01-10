import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { IReservation, IReservationPost } from '../models/reservation';
import { IPrice } from '../models/prices';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.BASE_URL}/FlightDetailService.svc/api`;

  getReservationsByUser(userId: number): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(`${this.baseUrl}/${userId}`);
  }

  getFlightPrices(flightId: number): Observable<IPrice[]> {
    return this.http.get<IPrice[]>(
      `https://serviciosdistribuidas.azurewebsites.net/FlightPriceService.svc/api/${flightId}`
    );
  }

  createReservation(reservation: IReservationPost): Observable<boolean> {
    console.log(reservation);
    return this.http.post<boolean>(`${this.baseUrl}`, reservation);
  }

  cancelReservation(flightId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${flightId}`);
  }
}
