import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Flight, FlightStatus } from '../models/flight.model';
import { FlightPrice, FlightClass } from '../models/flight-price.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl: string = environment.BASE_URL;
  private readonly http: HttpClient = inject(HttpClient);

  private flights: Flight[] = [
    { id: 1, origin: 'New York', destination: 'London', flightDate: '2025-01-01T10:00:00Z', status: FlightStatus.ACTIVE },
    { id: 2, origin: 'Paris', destination: 'Tokyo', flightDate: '2023-12-02T12:00:00Z', status: FlightStatus.IN_COURSE },
    { id: 3, origin: 'Berlin', destination: 'Sydney', flightDate: '2023-12-03T14:00:00Z', status: FlightStatus.COMPLETED },
  ];

  searchFlights(origin: string, destination: string, flightDate: string): Observable<Flight[]> {
    const searchDate = flightDate ? new Date(flightDate).toISOString().split('T')[0] : '';
    
    const filteredFlights = this.flights.filter(flight => {
      const flightDateStr = new Date(flight.flightDate).toISOString().split('T')[0];
      
      return (!origin || flight.origin.toLowerCase().includes(origin.toLowerCase())) &&
             (!destination || flight.destination.toLowerCase().includes(destination.toLowerCase())) &&
             (!searchDate || flightDateStr === searchDate);
    });
    
    return of(filteredFlights);
  }

  private flightPrices: FlightPrice[] = [
    { id: 1, flightId: 1, class: FlightClass.FIRST, seats: 10, total: 5000 },
    { id: 2, flightId: 1, class: FlightClass.BUSINESS, seats: 20, total: 3000 },
    { id: 3, flightId: 1, class: FlightClass.ECONOMIC, seats: 100, total: 1000 },
    { id: 4, flightId: 2, class: FlightClass.FIRST, seats: 8, total: 6000 },
    { id: 5, flightId: 2, class: FlightClass.BUSINESS, seats: 15, total: 3500 },
    { id: 6, flightId: 2, class: FlightClass.ECONOMIC, seats: 120, total: 1200 },
    { id: 7, flightId: 3, class: FlightClass.FIRST, seats: 5, total: 7000 },
    { id: 8, flightId: 3, class: FlightClass.BUSINESS, seats: 10, total: 4000 },
    { id: 9, flightId: 3, class: FlightClass.ECONOMIC, seats: 150, total: 1500 },
  ];

  getFlights(): Observable<Flight[]> {
    return of(this.flights);
  }

  getFlightPrices(): Observable<FlightPrice[]> {
    return of(this.flightPrices);
  }

  private getAuthHeaders(): HttpHeaders {
    const rawData = localStorage.getItem('loggedUser');
    let token = '';

    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        const rawToken = parsedData.token || '';
        token = rawToken.replace('Bearer ', ''); 
      }
    } catch (e) {
      console.error('Error al parsear el token:', e);
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
  }
}