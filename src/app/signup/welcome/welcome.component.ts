import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AppwriteService } from '../../../lib/appwrite.service';
import { UserdataService } from '../../services/appwrite/userdata/userdata.service';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  imagePreview: any;
  hide: boolean = true;
  signupData: any;
  durationInSeconds = 5;
  private user_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appwriteService: AppwriteService,
    private userData: UserdataService
  ) {}
  ngOnInit(): void {
    this.signupData = this.userData.getSignupData();

    if (this.signupData) {
      this.welcomeForm.patchValue({
        user_name: this.signupData.user_name,
        user_email: this.signupData.user_email,
        user_password: this.signupData.user_password,
      });
    }
  }

  welcomeForm: FormGroup = this.fb.group({
    // user_name: [ '', Validators.required],
    user_name: [{ value: '', disabled: true }, Validators.required],
    user_tag: ['', Validators.required],
    user_email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
    user_password: [{ value: '', disabled: true }],
    user_bio: [''],
    user_profile_pic: [null],
    user_phone_no: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    user_gender: ['', Validators.required],
    user_dob: [''],
    user_location: [''],
    user_url: [''],
    user_fav_food_recipe: [''],
  });

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
      // this.welcomeForm.patchValue({
      //   user_profile_pic: file
      // });
    }
  }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     this.welcomeForm.patchValue({
  //       user_profile_pic: file
  //     });
  //   }
  // }

  async onSubmit() {
    if (this.welcomeForm.valid && this.signupData) {
      try {
        const profile_pic = (
          document.getElementById('profile_pic') as HTMLInputElement
        ).files;
        const userProfilePic = profile_pic ? Array.from(profile_pic) : [];

        const profilePicUrl = await this.appwriteService.uploadProfilePic(
          userProfilePic
        );

        const account = await this.appwriteService.createAccount(
          this.signupData.user_email,
          this.signupData.user_password,
          this.signupData.user_name
        );

        console.log('Account Created:', account);

        const userData = {
          // user_id: account.$id,
          user_name: this.signupData.user_name,
          user_email: this.signupData.user_email,
          user_password: this.signupData.user_password,
          user_tag: this.welcomeForm.value.user_tag,
          user_bio: this.welcomeForm.value.user_bio,
          user_profile_pic: profilePicUrl,
          user_phone_no: this.welcomeForm.value.user_phone_no,
          user_gender: this.welcomeForm.value.user_gender,
          user_dob: this.welcomeForm.value.user_dob,
          user_location: this.welcomeForm.value.user_location,
          user_url: this.welcomeForm.value.user_url,
          user_fav_food_recipe: this.welcomeForm.value.user_fav_food_recipe,
        };

        await this.appwriteService.createUserDocument(account.$id, userData).then(() => {
          console.log('submitting all data:', userData);
          this.user_snackBar.open('Account Created Successfully, Kindly Login', 'Close', {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/login']);
        });

        // const userData = this.welcomeForm.value;
      } catch (error) {
        console.error('Failed to Create New user: ', error);
        this.user_snackBar.open('check console for errors', 'Close', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    }
    // this.router.navigate(['/home-feed'])
  }
  saveChanges() {
    const profile_pic = (
      document.getElementById('profile_pic') as HTMLInputElement
    ).files;

    const userProfilePic = profile_pic ? Array.from(profile_pic) : [];

    this.appwriteService
      .uploadProfilePic(userProfilePic)
      .then((profilePicUrl) => {
        // const userData = this.welcomeForm.value;
        const userData = {
          user_name: this.welcomeForm.get('user_name')?.value,
          user_email: this.welcomeForm.get('user_email')?.value,
          user_password: this.welcomeForm.get('user_password')?.value,
          user_tag: this.welcomeForm.get('user_tag')?.value,
          user_bio: this.welcomeForm.get('user_bio')?.value,
          user_profile_pic: profilePicUrl,
          user_phone_no: this.welcomeForm.get('user_phone_no')?.value,
          user_gender: this.welcomeForm.get('user_gender')?.value,
          user_dob: this.welcomeForm.get('user_dob')?.value,
          user_location: this.welcomeForm.get('user_location')?.value,
          user_url: this.welcomeForm.get('user_url')?.value,
          user_fav_food_recipe: this.welcomeForm.get('user_fav_food_recipe')
            ?.value,
        };
        return this.appwriteService.createNewUser(userData);
      })
      .then(() => {
        console.log(this.welcomeForm.value);
        this.user_snackBar.open('Changes Saved', 'Close', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
      .catch((error) => {
        console.log(this.welcomeForm.value);
        console.error('Failed to Create New user: ', error);
        this.user_snackBar.open('check console for errors', 'Close', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });

    // console.log(this.welcomeForm.value);
    // this.router.navigate(['/home-feed']);
  }
}
