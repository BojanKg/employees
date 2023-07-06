import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Auth } from './auth.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  log = new BehaviorSubject<Auth>(null!);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  getAuth(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwmGntEsIcFO4hszkJIBStIxDzmDKrzwI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.log.next(null!);
    this.router.navigate(['']);
    localStorage.removeItem('adminData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const admin = new Auth(email, userId, token, expirationDate);
    this.log.next(admin);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('adminData', JSON.stringify(admin));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() =>errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }

  private loginLog = new BehaviorSubject<boolean>(false);

  setLoginLog(log: boolean) {
    this.loginLog.next(log);
  }

  getLoginLog() {
    return this.loginLog.asObservable();
  }

  private user  = new BehaviorSubject<string>('');

  setUser(user: string) {
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }
}
