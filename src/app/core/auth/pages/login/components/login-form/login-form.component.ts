import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ILoginRequest } from '../../models/login.interface';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/auth/services/auth.service';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MATERIAL, RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly loginSrv: LoginService = inject(LoginService);
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  protected hide: WritableSignal<boolean> = signal(true);
  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

   onSubmit(): void {
    const loginData: ILoginRequest = this.loginForm.value;

    this.loginSrv.login(loginData).subscribe({
      next: (res) => {
        if (res.GetUserResult) {
          this.authSrv.saveLoggedUserInLocalStorage(res);
          // Como todo es admin, siempre redirigimos a /admin
          this.router.navigate(['/admin']);
        } else {
          console.error('Credenciales inválidas');
          // Aquí puedes manejar el error de login inválido
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}