import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from '@core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.loggedUserRedirector();
  }

  loggedUserRedirector(): void {
    const loggedUser = this.authSrv.getLoggedUserFromLocalStorage();
    
    if (loggedUser?.GetUserResult?.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (loggedUser?.GetUserResult?.role === 'CLIENT') {
      this.router.navigate(['/catalog']);
    }
  }
}