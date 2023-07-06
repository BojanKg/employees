import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logIn: FormGroup;
  isLoginMode = true;
  formLogin = true;
  loginLog = false;
  isLoading = false;
  error: string = null!;
  mail: string[] = [];
  selectedMail: string;

  userName: string;

  private errorSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.logIn = new FormGroup({
      userData: new FormGroup({
        user: new FormControl(null, [
          Validators.required
        ]),
        password: new FormControl(null, [
          Validators.required
        ]),
      })
    });
  }

  auth() {
    if(!this.logIn.valid) {
      return;
    }
    let user = this.logIn.get('userData.user')?.value + "@gmail.com";
    let password = this.logIn.get('userData.password')?.value;

    this.authService.setUser(user);

    let adminObs: Observable<AuthResponseData>;

    this.isLoading = true;

    adminObs = this.authService.getAuth(user, password);

    adminObs!.subscribe({
      next: resData => {
        console.log(resData);
        this.loginLog = true;
        this.isLoading = false;
        this.authService.setLoginLog(this.loginLog);
        if (this.isLoginMode) {
          this.router.navigate(['/employees']);
        } 
        else {
          this.router.navigate(['auth']);
        }
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginLog = false;
      }
    });
    this.logIn.reset();
  }

  log() {
    this.isLoginMode = !this.isLoginMode;
  }

  logOut() {
    this.authService.logout();
    this.loginLog = false;
    this.formLogin = true;
    this.isLoginMode = true;
    this.isLoading = false;
    location.reload();
  }

  onDestroy() {
    this.errorSub.unsubscribe();
  }
}
