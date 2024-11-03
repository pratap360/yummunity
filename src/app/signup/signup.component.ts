import { Component, OnInit , inject} from '@angular/core';
import { Router , RouterLink} from '@angular/router';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';

import { Client, Account,ID } from "appwrite";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  hide: boolean = true;

  faGoogle = faGoogle;
  faHeart = faHeart;

  durationInSeconds = 5;

  client = new Client();
  account: any;
  constructor(private fb: FormBuilder) {
    this.client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('670194640036c325ba3a');
  this.account = new Account(this.client);
  }
  ngOnInit(): void {

  }

  signupForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  onSignUp() {
    if(!this.signupForm.valid) {
      console.log(this.signupForm.value);
      this._snackBar.open('Sign Up Successfully!!', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
    console.log(this.signupForm.value);
    
    this.createAccount();
  }



  createAccount() {
    this.account.create(ID.unique(), this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username)
    .then(function (response: any) {
        console.log(response);
    }, function (error: any) {
        console.log(error);
          //  password : "Pratap@1234"
    });
   }
  // createAccount() {
  //   this.account.create(ID.unique(), "pratap@yummunity.com", "Pratap@201", "Pratap")
  //   .then(function (response: any) {
  //       console.log(response);
  //   }, function (error: any) {
  //       console.log(error);
  //   });
  //  }


}
