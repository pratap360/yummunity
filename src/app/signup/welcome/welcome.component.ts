import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
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
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
imagePreview: any;
welcomeForm: FormGroup;

  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

constructor(private fb : FormBuilder, private router: Router) {
this.welcomeForm = this.fb.group({
  user_name: ['', Validators.required],
  user_tag: ['', Validators.required],
  user_bio: [''],
  user_profile_pic: [null],
  user_email: ['', [Validators.required, Validators.email]],
  user_password: ['',[Validators.required, Validators.minLength(8)]],
  user_confirm_password: ['',[Validators.required, Validators.minLength(8)]],
  user_phone_no: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')] ],
  user_gender: [''],
  user_dob: [''],
  user_location: [''],
  user_url: [''],
  user_fav_food_recipe: ['']
});
 }

ngOninit() {

}
onSubmit() {
throw new Error('Method not implemented.');
}

onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}



saveChanges(){
  this.router.navigate(['/home-feed']);
  this._snackBar.open('Changes Saved', 'Close', {
    duration: this.durationInSeconds * 1000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
}
