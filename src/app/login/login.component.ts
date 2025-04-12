import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
import { Client, Account} from 'appwrite';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
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

  client = new Client();
  account: any;

  durationInSeconds = 5;
  private login_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb: FormBuilder, private router: Router) {
    this.client.setProject(environment.appwrite_ProjectID);
    // .setEndpoint('https://cloud.appwrite.io/v1')
    this.account = new Account(this.client);
  }

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  // loginForm: FormGroup = this.fb.group({
  //   email: ['pratap@yummunity.com', [Validators.required, Validators.email]],
  //   password: ['Pratap@1234', [Validators.required, Validators.minLength(6)]],
  // });

  onLogin() {
    if (!this.loginForm.valid) {
      this.login_snackBar.open('Login Successfully!!', 'OK', {
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
       (response: any) => {
        console.log(response); // Success
        this.router.navigate(['/home-feed']);
      },
       (error: any) => {
        console.log(error); // Failure
        this.router.navigate(['/login']);
        this.login_snackBar.open('Login Failed!!', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        })
      }
    );
  }


  onGoogleLogin():void {
    this.login_snackBar.open('This is under Devlopment, kindly use Basic Login', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
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
