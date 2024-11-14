import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';

import { Client, Account } from 'appwrite';
// import { AuthService } from '../../lib/appwrite/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    ForgetPwdComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  hide: boolean = true;

  faGoogle = faGoogle;
  faHeart = faHeart;

  durationInSeconds = 5;

  client = new Client();
  account: any;

  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb: FormBuilder) {
    this.client.setProject('670194640036c325ba3a');
    // .setEndpoint('https://cloud.appwrite.io/v1')
    this.account = new Account(this.client);
  }

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    email: ['pratap@yummunity.com', [Validators.required, Validators.email]],
    password: ['Pratap@1234', [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    if (!this.loginForm.valid) {
      this._snackBar.open('Login Successfully!!', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
    console.log(this.loginForm.value);
    this.LoginSession();
  }

  LoginSession() {
    const session = this.account.createEmailPasswordSession(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    session.then(
      function (response: any) {
        console.log(response); // Success
      },
      function (error: any) {
        console.log(error); // Failure
      }
    );
  }

  //  onSignUp() {
  //   this.account.create(ID.unique(), "pratap@yummunity.com", "Pratap@201", "Pratap")
  //   .then(function (response: any) {
  //       console.log(response);
  //   }, function (error: any) {
  //       console.log(error);
  //   });
  //  }
}
