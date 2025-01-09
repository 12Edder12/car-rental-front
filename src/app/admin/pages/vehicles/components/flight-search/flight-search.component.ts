import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIcon
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  @Output() search = new EventEmitter<Flight[]>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.searchForm = this.fb.group({
      origin: [''],
      destination: [''],
      flightDate: ['']
    });
  }

  onSearch(): void {
    const { origin, destination, flightDate } = this.searchForm.value;
    this.flightService.searchFlights(origin, destination, flightDate).subscribe((flights) => {
      this.search.emit(flights);
    });
  }
}