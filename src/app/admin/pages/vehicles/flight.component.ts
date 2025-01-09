import { Component, inject, OnInit } from '@angular/core';
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
  
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    // Cargar todos los vuelos al inicio
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(flights => {
      this.flights = flights;
    });
  }

  onSearch(flights: Flight[]): void {
    this.flights = flights;
  }
}