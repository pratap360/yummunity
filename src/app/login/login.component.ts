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
import { Client, Account } from 'appwrite';
import { environment } from '../../environments/environment';
import { AppwriteService } from '../../lib/appwrite.service';

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
  hide: boolean = true;
  // loginForm!: FormGroup;

  faGoogle = faGoogle;
  faHeart = faHeart;

  client = new Client();
  account: any;

  durationInSeconds = 5;
  private login_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appwriteService: AppwriteService
  ) {
    this.client.setProject(environment.appwrite_ProjectID);
    this.account = new Account(this.client);
  }

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

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
        });
      }
    );
  }

  async onGoogleLogin() {
    try {
      await this.appwriteService.loginWithGoogle();
      // The page will automatically redirect to the success URL (account page)
    } catch (error) {
      console.error('Google login error:', error);
      this.login_snackBar.open('Google login failed. Please try again.', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }
}
