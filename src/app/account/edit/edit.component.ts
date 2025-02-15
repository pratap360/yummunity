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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  name = 'Pratap Parui';
  username = '@pratap360';
  description = 'Developer | Food Lover & Critics';
  recipesCount = 10;
  followersCount = 349;
  yummunityRating = 4.5;

  accountForm: FormGroup;
  imagePreview: string | null = null;
  hide: boolean = true;

  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

 constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
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

  ngOnInit(): void {}

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

  onSubmit(): void {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      // Handle form submission
    }
  }

  saveChanges(): void{
    // ? write the logic to save the changes form update appwrite database
    this._snackBar.open('Profile Updated Successfully!!', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  goBack(): void {
    window.history.back();
  }
}
