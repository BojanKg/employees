import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  logIn: FormGroup;

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

  log() {
    let user = this.logIn.get('userData.user')?.value;
    let password = this.logIn.get('userData.password')?.value;
    console.log(user, "-", password)
  }
}
