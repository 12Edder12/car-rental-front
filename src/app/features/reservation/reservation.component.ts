import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'app/admin/pages/flights/models/flight.model';
import { IPrice } from './models/prices';
import { ReservationService } from './services/reservation.service';
import { IReservationPost } from './models/reservation';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly reservationSrv: ReservationService =
    inject(ReservationService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);

  protected flight: Flight | null = null;
  protected total: number = 0;
  protected prices: IPrice[] = [];

  protected passengerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  protected seatForm = this.fb.group({
    seatClass: ['', Validators.required],
    seatsAmount: ['', Validators.required],
  });

  constructor() {
    this.route.paramMap.subscribe(() => {
      this.flight = history.state.flight;
      if (this.flight) {
        this.loadPrices();
      }
    });
  }

  ngOnInit() {
    this.seatForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    const classId = this.seatForm.get('seatClass')?.value;
    const seats = this.seatForm.get('seatsAmount')?.value;

    if (classId && seats) {
      const selectedPrice = this.prices.find((p) => p.Class === classId);
      if (selectedPrice) {
        this.total = selectedPrice.Total * Number(seats);
      }
    }
  }

  loadPrices() {
    this.reservationSrv.getFlightPrices(this.flight!.Id).subscribe({
      next: (prices) => {
        this.prices = prices;
      },
    });
  }

  get canSubmit(): boolean {
    return this.passengerForm.valid && this.seatForm.valid;
  }

  submitReservation() {
    if (this.canSubmit) {
      const classId: number = this.getClassId(
        this.seatForm.get('seatClass')?.value!
      );
      const flightDeatil: IReservationPost = {
        ClassId: classId,
        FlightId: this.flight?.Id!,
        Seats: +this.seatForm.get('seatsAmount')?.value!,
        Total: this.total,
        UserId: 2,
      };

      this.reservationSrv.createReservation(flightDeatil).subscribe({
        next: () => {
          this.notificationSrv.activateNotification(
            'Vuelo Reservado',
            StateNotification.SUCCESS
          );
        },
        error: () => {
          this.notificationSrv.activateNotification(
            'Error al reservar vuelo',
            StateNotification.ERROR
          );
        },
      });
    }
  }

  getClassName(classId: number): string {
    return this.prices.find((price) => price.Id === classId)!.Class;
  }

  getClassId(name: string): number {
    return this.prices.find((id) => id.Class === name)!.Id;
  }
}
