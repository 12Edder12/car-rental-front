import { Injectable } from '@angular/core';
import { ILoginResponse } from '../pages/login/models/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<ILoginResponse | null> =
    new BehaviorSubject<ILoginResponse | null>(
      this.getLoggedUserFromLocalStorage()
    );
  public loggedInUser$: Observable<ILoginResponse | null> =
    this.loggedInUserSubject.asObservable();

  saveLoggedUserInLocalStorage(loggedUser: ILoginResponse): void {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    this.loggedInUserSubject.next(loggedUser);
  }

  getLoggedUserFromLocalStorage(): ILoginResponse {
    return JSON.parse(localStorage.getItem('loggedUser') || '{}');
  }

  removeLoggedUserFromLocalStorage(): void {
    localStorage.removeItem('loggedUser');
    this.loggedInUserSubject.next(null);
  }
}