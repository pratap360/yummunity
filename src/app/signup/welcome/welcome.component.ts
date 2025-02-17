import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
imagePreview: any;
welcomeForm: FormGroup;

constructor(private fb : FormBuilder) {
this.welcomeForm = this.fb.group({
  username: [''],
  email: [''],
  password: [''],
  confirmPassword: ['']
});
 }

ngOninit() {

}
onSubmit() {
throw new Error('Method not implemented.');
}
onImageSelected($event: Event) {
throw new Error('Method not implemented.');
}

}
