import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Flight } from '../../models/flight.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent {
  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['origin', 'destination', 'flightDate', 'status', 'actions'];
}