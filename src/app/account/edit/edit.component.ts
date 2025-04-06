import { Component, inject } from '@angular/core';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
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
import { BottomNavComponent } from '../../../components/bottom-nav/bottom-nav.component';
import { AppwriteService } from '../../../lib/appwrite.service';
import { UserData } from '../../interface/user-data';
import { error } from 'console';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    SidenavComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    BottomNavComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  // name = 'Pratap Parui';
  // username = '@pratap360';
  // description = 'Developer | Food Lover & Critics';
  // recipesCount = 10;
  // followersCount = 349;
  // yummunityRating = 4.5;

  editProfileForm: FormGroup;
  imagePreview!: string;
  hide: boolean = true;

  durationInSeconds = 5;
  private edit_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userId!: string;
  userData!: UserData;

  constructor(
    private fb: FormBuilder,
    private appwriteService: AppwriteService
  ) {
    this.editProfileForm = this.fb.group({
      user_name: ['', Validators.required],
      user_tag: ['', Validators.required],
      user_bio: [''],
      user_profile_pic: [''],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(8)]],
      // user_confirm_password: ['',[Validators.required, Validators.minLength(8)]],
      user_phone_no: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      user_gender: [''],
      user_dob: [''],
      user_location: [''],
      user_url: [''],
      user_fav_food_recipe: [''],
    });
  }

  ngOnInit(): void {
    this.appwriteService.getCurrentUser().subscribe({
      next: (res: any) => {
        this.userId = res.$id;
        this.fetchUserData();
      },
      error: (err) => {
        console.error('Error getting current user:', err);
      },
    });
  }

  fetchUserData(): void {
    const allUserData = this.appwriteService
      .getUserData(this.userId)
      .subscribe({
        next: (res: UserData) => {
          this.userData = res;
          this.editProfileForm.patchValue({
            user_name: this.userData.user_name,
            user_tag: this.userData.user_tag,
            user_bio: this.userData.user_bio,
            user_profile_pic: res.user_profile_pic || null,
            user_email: this.userData.user_email,
            user_password: this.userData.user_password,
            user_phone_no: this.userData.user_phone_no,
            user_gender: this.userData.user_gender,
            user_dob: this.userData.user_dob,
            user_location: this.userData.user_location,
            user_url: this.userData.user_url,
            user_fav_food_recipe: this.userData.user_fav_food_recipe,
          });
          // this.imagePreview = typeof this.userData.user_profile_pic === 'string' ? this.userData.user_profile_pic : '';
          this.imagePreview = res.user_profile_pic || '';
        },
        error: (error) => {
          console.error('Error fetching user data on edit component:', error);
        },
      });
    console.log('all User Data Values:', allUserData);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.edit_snackBar.open('Please select an image file', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Store the file object directly in the form
    this.editProfileForm.patchValue({
      user_profile_pic: file  // Store the file object, not the base64 string
    });
    }
  }

  saveChanges(): void {
    if (this.editProfileForm.invalid) {
      this.edit_snackBar.open('Please fill in all required fields', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return; // Add this to prevent further execution
    }
  
    // Show loading indicator
    this.edit_snackBar.open('Updating your profile...', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: undefined, // No auto-dismiss
    });
  
    const updatedUserData: UserData = this.editProfileForm.value;
    this.appwriteService
      .updateUserData(this.userId, updatedUserData)
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.edit_snackBar.dismiss(); // Dismiss the loading indicator
          this.edit_snackBar.open('Profile Updated Successfully!', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
          this.goBack();
        },
        error: (error: any) => {
          console.error('Error updating user data:', error);
          this.edit_snackBar.dismiss(); // Dismiss the loading indicator
          this.edit_snackBar.open('Unable to update profile: ' + (error.message || 'Unknown error'), 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 3000,
          });
        },
      });
  }
  goBack(): void {
    window.history.back();
  }
}
