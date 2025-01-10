import { Component, OnInit } from '@angular/core';
import { FlightService } from './services/flight.service';
import { Flight } from './models/flight.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightResultsComponent } from './components/flight-results/flight-results.component';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
];

@Component({
  selector: 'app-flights',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
  imports: [MATERIAL, ReactiveFormsModule, CommonModule, FlightSearchComponent, FlightResultsComponent],
  standalone: true,
})
export class FlightComponent implements OnInit {
  flights: Flight[] = [];
  allFlights: Flight[] = []; // Lista completa de vuelos
  
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(flights => {
      this.allFlights = flights;
      this.flights = flights;
    });
  }

  onSearch(filters: { origin: string, destination: string, flightDate: string }): void {
    const { origin, destination, flightDate } = filters;
    const searchDateStr = flightDate ? new Date(flightDate).toISOString().split('T')[0] : '';

    this.flights = this.allFlights.filter(flight => {
      const flightDateStr = new Date(flight.FlightDate).toISOString().split('T')[0];

      return (!origin || flight.Origin.toLowerCase().includes(origin.toLowerCase())) &&
             (!destination || flight.Destination.toLowerCase().includes(destination.toLowerCase())) &&
             (!searchDateStr || flightDateStr === searchDateStr);
    });

  }

  onClear(): void {
    this.flights = this.allFlights;
  }
}