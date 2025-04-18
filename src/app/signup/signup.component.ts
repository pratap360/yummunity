import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Client, Account, ID } from 'appwrite';
import { environment } from '../../environments/environment';
import { AppwriteService } from '../../lib/appwrite.service';
import { UserdataService } from '../services/appwrite/userdata/userdata.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  hide: boolean = true;

  faGoogle = faGoogle;
  faHeart = faHeart;

  durationInSeconds = 5;

  client = new Client();
  account: any;
  username: any;
  constructor(
    private fb: FormBuilder,
    private appwriteService: AppwriteService,
    private router: Router,
    private userData: UserdataService
  ) {
    this.client
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    this.account = new Account(this.client);
  }

  ngOnInit(): void {}

  signupForm: FormGroup = this.fb.group({
    user_name: ['', [Validators.required]],
    user_email: ['', [Validators.required, Validators.email]],
    user_password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private signup_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  onSignUp() {
    if (this.signupForm.invalid) {
      this.signup_snackBar.open('Kindly Fill All Detials', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    } else {
      this.userData.setSignupData(this.signupForm.value);
      sessionStorage.setItem('signupFlow', 'true');
      // console.log(this.signupForm.value);

      this.signup_snackBar.open(
        'Account Created Successfully, Kindly Fill All Detials',
        'OK',
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        }
      );
      this.router.navigate(['/welcome'])
    }
  }

  createUserAccount() {
    if (this.signupForm.invalid) {
      return alert('Please fill in all the required fields');
    }

    const userInfo = {
      user_name: this.signupForm.value.user_name,
      user_email: this.signupForm.value.user_email,
      user_password: this.signupForm.value.user_password,
    };

    this.account
      .create(
        ID.unique(),
        this.signupForm.value.user_email,
        this.signupForm.value.user_password,
        this.signupForm.value.user_name
      )
      .then(
        this.appwriteService
          .userData(userInfo)
          .then(() => {
            this.signup_snackBar.open('Sign Up Successfully!!', 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            sessionStorage.setItem('signupFlow', 'true');
          })
          .catch((error) => {
            this.signup_snackBar.open('Failed to Sign Up', 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            // console.log("'Failed to create user account", error);
          })
      );
  }

  googleLogin(): void {
    this.signup_snackBar.open('This is under Devlopment, kindly use Basic Sign Up', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }


}
