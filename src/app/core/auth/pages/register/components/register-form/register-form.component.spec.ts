import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RegisterService } from '../../services/register.service';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and validators', () => {
    const form = component.registerForm;
    expect(form.get('email')?.value).toBeNull();
    expect(form.get('email')?.valid).toBeFalse();

    expect(form.get('password')?.value).toBeNull();
    expect(form.get('password')?.valid).toBeFalse();

    expect(form.get('confirmPassword')?.value).toBeNull();
    expect(form.get('confirmPassword')?.valid).toBeFalse();
  });

  it('should validate email as required and valid format', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate password as required and with a minimum length', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalse();
    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should display an error when passwords do not match', () => {
    const passwordControl = component.registerForm.get('password');
    const confirmPasswordControl =
      component.registerForm.get('confirmPassword');
    passwordControl?.setValue('123456');
    confirmPasswordControl?.setValue('654321');
    component.matchValidator();
    expect(confirmPasswordControl?.hasError('notMatch')).toBeTrue();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword()).toBeTrue();
    component.clickEvent(new MouseEvent('click'), 1);
    expect(component.hidePassword()).toBeFalse();
  });

  it('should disable the submit button when form is invalid', () => {
    const buttonElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector(
        'button.submit-form-btn'
      );
    component.registerForm.get('email')?.setValue('');
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeTrue();

    component.registerForm.get('email')?.setValue('test@example.com');
    component.registerForm.get('password')?.setValue('123456');
    component.registerForm.get('confirmPassword')?.setValue('123456');
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalse();
  });

  it('should call register service on submit', () => {
    const registerService = TestBed.inject(RegisterService);
    const router = TestBed.inject(Router);

    const registerSpy = spyOn(registerService, 'register').and.returnValue(
      of({
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'test@example.com',
        password: '123456',
        phone: '1234567890',
        role: 'CLIENT',
      })
    );
    const routerSpy = spyOn(router, 'navigate');

    component.registerForm.get('email')?.setValue('test@example.com');
    component.registerForm.get('password')?.setValue('123456');
    component.registerForm.get('confirmPassword')?.setValue('123456');

    component.onSubmit();

  /*  expect(registerSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
    });*/
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
