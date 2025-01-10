import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '@features/reservation/services/reservation.service';
import { IReservation } from '@features/reservation/models/reservation';
import { AuthService } from '@core/auth/services/auth.service';
import { ILoginResponse } from '@core/auth/pages/login/models/login.interface';
import { NotificationService } from '@shared/services/notification.service';
import { StateNotification } from '@shared/enums/state-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css'],
})
export class MyReservationsComponent implements OnInit {
  private readonly reservationSrv = inject(ReservationService);
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly notificationSrv: NotificationService =
    inject(NotificationService);
  private readonly router: Router = inject(Router);

  protected loggedUser: ILoginResponse | null = null;
  protected displayedColumns: string[] = [
    'Id',
    'FlightId',
    'ClassId',
    'Seats',
    'Total',
    'actions',
  ];
  protected dataSource: MatTableDataSource<IReservation>;
  protected reservations: IReservation[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<IReservation>();
  }

  ngOnInit() {
    this.loggedUser = this.authSrv.getLoggedUserFromLocalStorage();
    this.loadReservations(this.loggedUser.GetUserResult?.Id!);
  }

  loadReservations(id: number) {
    this.reservationSrv.getReservationsByUser(id).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.dataSource.data = this.reservations;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getClassType(classId: number): string {
    return classId === 1 ? 'Primera Clase' : 'Económico';
  }

  cancelReservation(id: number) {
    this.reservationSrv.cancelReservation(id).subscribe({
      next: () => {
        this.notificationSrv.activateNotification(
          'Reserva cancelada exitosamente',
          StateNotification.SUCCESS
        );
        this.router.navigate(['/vehicles']);
      },
      error: () => {
        this.notificationSrv.activateNotification(
          'Error al cancelar la reserva',
          StateNotification.ERROR
        );
      },
    });
  }
}
