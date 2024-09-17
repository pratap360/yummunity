import { Component, OnInit } from '@angular/core';
import { Router , RouterLink} from '@angular/router';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  hide: boolean = false;
  faGoogle = faGoogle;
  faHeart = faHeart;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if(!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

}
