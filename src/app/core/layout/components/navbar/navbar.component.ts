import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@core/auth/services/auth.service';
import { NavigationItem } from '@core/layout/models/navigation-item.interface';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@core/auth/pages/login/services/login.service';

const MATERIAL = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MATERIAL, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly loginSrv: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  public navigationItems: NavigationItem[] = [];
  protected logoutItem: NavigationItem = {
    title: 'Cerrar sesión',
    icon: 'exit_to_app',
    route: '/',
  };

  ngOnInit(): void {
    const loggedUser = this.authSrv.getLoggedUserFromLocalStorage();
    if (loggedUser?.GetUserResult?.role) {
      this.navigationItems = this.itemsPerRoleChecker(loggedUser.GetUserResult.role);
    }
  }

  private itemsPerRoleChecker(role: string): NavigationItem[] {
    let items: NavigationItem[] = [];

    if (role === 'ADMIN') {
      items = [
        { title: 'Vuelos', icon: 'flight_land', route: '/flights' },
        {
          title: 'Mis Reservaciones',
          icon: 'flight_takeoff',
          route: '/my-reservations',
        },
      ];
    }

    return items;
  }

  logout(): void {
    this.loginSrv.logout();
    this.router.navigate(['/']);
  }
}
