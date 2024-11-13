import { ChangeDetectionStrategy, Component, inject, model,OnInit,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA,  MatDialog,  MatDialogActions,  MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, Account } from 'appwrite';
import { HomeFeedComponent } from '../../app/home-feed/home-feed.component';

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
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostsComponent implements OnInit {
  postrecipeForm: FormGroup

  users: any[] = [];
  
  canPost: boolean = true;
  imagePreviews: string[] = [];
  currentImageIndex: number = 0;

  client = new Client();
  account: any;


  constructor(
    private userService: UsersService,
    private http: HttpClient,
    // private dialogRef: MatDialogRef<RecipeDialogComponent>,
    private snackBar: MatSnackBar,
    // private closedialog : HomeFeedComponent
  ){
// Initialize the form with controls
this.postrecipeForm = new FormGroup({
  postContent: new FormControl('', [Validators.required, Validators.maxLength(2000)])
});

    this.client.setProject('670194640036c325ba3a')
    .setEndpoint('https://cloud.appwrite.io/v1');
    this.account = new Account(this.client);
  }

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

  postRecipe(){
    console.log('Appwrite Service :: postRecipe() ::');

    
    // this.closedialog.closeDialog();
    // * have to close the pop up and show a toast that the recipe has been posted
  }


}
