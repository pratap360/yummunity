import { ChangeDetectionStrategy, Component, inject, model,OnInit,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA,  MatDialog,  MatDialogActions,  MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostsComponent implements OnInit {
  canPost: boolean = true;

  users: any[] = [];

  imagePreviews: string[] = [];
  currentImageIndex: number = 0;
  constructor(
    private userService: UsersService,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.userService.getUsersdata().subscribe({
      next: (response) => {
        this.users = response.data.data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  // onFileSelected(event: any) {
  //   debugger
  //   if (event.target.files.lenght > 0) {
  //     const file = event.target.files[0];
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     this.http.post('apiUrl', formData).subscribe((response: any) => {
  //       debugger;
  //     });
  //   }
  //   console.log(event);
  // }

  
  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreviews = reader.result;  // Set the preview
  //     };
  //     reader.readAsDataURL(file);  // Read the image file
  //   }
  // }
  // onSelectedImages(event: Event): void {
  //   const files = (event.target as HTMLInputElement).files;
  //   if (files) {
  //     const fileArray = Array.from(files);

  //     // Limit to 4 files
  //     if (fileArray.length > 4) {
  //       alert('You can only upload a maximum of 4 images');
  //       return;
  //     }

  //     this.imagePreviews = [];  // Clear previous previews
  //     fileArray.forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.imagePreviews.push(reader.result as string);  // Add preview to the array
  //       };
  //       reader.readAsDataURL(file);  // Read the image file
  //     });
  //   }
  // }

  onSelectedImages(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const fileArray = Array.from(files);

      // Limit to 4 files
      if (fileArray.length > 4) {
        alert('You can only upload a maximum of 4 images');
        return;
      }

      this.imagePreviews = [];  // Clear previous previews
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);  // Add preview to the array
        };
        reader.readAsDataURL(file);  // Read the image file
      });

      this.currentImageIndex = 0;  // Reset the index when new images are uploaded
    }
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.imagePreviews.length - 1) {
      this.currentImageIndex++;
    }
  }




}
