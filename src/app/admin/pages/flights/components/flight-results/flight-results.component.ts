import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Flight } from '../../models/flight.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
})
export class FlightResultsComponent {
  private readonly router: Router = inject(Router);
  @Input() flights: Flight[] = [];
  displayedColumns: string[] = [
    'origin',
    'destination',
    'flightDate',
    'status',
    'actions',
  ];

  redirectToReservationPage(flight: Flight) {
    this.router.navigate(['/reservation'], { state: { flight: flight } });
  }
}
