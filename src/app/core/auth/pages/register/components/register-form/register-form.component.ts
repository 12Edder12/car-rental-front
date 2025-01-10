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
import { RegisterService } from '../../services/register.service';
import { IRegisterRequest } from '../../models/register.interface';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,

} from '@angular/forms';
import { CommonModule } from '@angular/common';

const MATERIAL = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MATERIAL, RouterLink, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly registerSrv: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);

  public hidePassword: WritableSignal<boolean> = signal(true);
  public hideConfirmPassword: WritableSignal<boolean> = signal(true);
  public registerForm: FormGroup = new FormGroup({
    dni: new FormControl(null, [Validators.required, Validators.minLength(10), this.validateEcuadorianId.bind(this)]),
    name: new FormControl(null, [Validators.required, Validators.minLength(3),]),
    lastname: new FormControl(null, [Validators.required,  Validators.minLength(3),]),
    address: new FormControl(null, [Validators.required, Validators.minLength(3),]),
    phone: new FormControl(null, [Validators.required,  Validators.pattern(/^\d{10}$/),]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
  
  // Agregar esta función en el componente
private validateEcuadorianId(control: FormControl): {[key: string]: any} | null {
  const value = control.value;
  
  // Validar que solo sean números y tenga 10 dígitos
  if (!/^\d{10}$/.test(value)) {
    return { invalidFormat: true };
  }

  // Algoritmo de validación de cédula ecuatoriana
  const provincia = parseInt(value.substring(0, 2));
  if (provincia < 1 || provincia > 24) {
    return { invalidProvince: true };
  }

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(value.charAt(i)) * coeficientes[i];
    if (valor > 9) valor -= 9;
    suma += valor;
  }

  const digitoVerificador = parseInt(value.charAt(9));
  const total = Math.ceil(suma / 10) * 10;
  const digitoCalculado = total - suma;

  if (digitoCalculado !== digitoVerificador) {
    return { invalidCheckDigit: true };
  }

  return null;
}

  constructor() {
    this.registerForm
      .get('confirmPassword')
      ?.valueChanges.subscribe(() => this.matchValidator());
  }

  clickEvent(event: MouseEvent, buttonRef: number): void {
    if (buttonRef === 1) {
      this.hidePassword.set(!this.hidePassword());
    } else {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
    event.stopPropagation();
  }

  matchValidator(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ notMatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  } 

  onSubmit(): void {
    const registerData: IRegisterRequest = {
      Dni: this.registerForm.get('dni')?.value,
      Name: this.registerForm.get('name')?.value,
      LastName: this.registerForm.get('lastname')?.value,
      Address: this.registerForm.get('address')?.value,
      Phone: this.registerForm.get('phone')?.value,
      Email: this.registerForm.get('email')?.value,
      Password: this.registerForm.get('password')?.value,
      Status: true,
    };

    console.log('Datos a enviar:', registerData);

    this.registerSrv.register(registerData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err),
    });
  }
}