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
        { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { title: 'Vehiculos', icon: 'directions_car', route: '/vehicles' },
        {
          title: 'Tipos Vehiculos',
          icon: 'directions_car',
          route: '/types-vehicles',
        },
        { title: 'Alquileres', icon: 'person_pin', route: '/settings' },
        { title: 'Facturas', icon: 'note_add', route: '/bills' },
        { title: 'Usuarios', icon: 'group', route: '/users' },
      ];
    }

    if (role === 'EMPLOYEE') {
      console.log('ADMIN');
      items = [
        { title: 'Alquileres', icon: 'person_pin', route: '/rental-status' },
        { title: 'Facturas', icon: 'note_add', route: '/bills' },
        { title: 'Devoluciones', icon: 'assignment_return', route: '/returns' },
      ];
    }

    if (role === 'CLIENT') {
      items = [
        { title: 'Vehiculos', icon: 'directions_car', route: '/catalog' },
        { title: 'Alquileres', icon: 'person_pin', route: '/rental-list' },
      ];
    }

    return items;
  }

  logout(): void {
    this.loginSrv.logout();
    this.router.navigate(['/']);
  }
}
