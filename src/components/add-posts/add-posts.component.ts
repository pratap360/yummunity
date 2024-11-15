import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar,  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, Account } from 'appwrite';
import { HomeFeedComponent } from '../../app/home-feed/home-feed.component';
import { AppwriteService } from '../../lib/appwrite.service';

@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatCardContent,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    
    // MatCardActions,
    // MatCardHeader,
    // MatCard,
    // MatDialogClose,
    // MatDialogTitle,
    // JsonPipe
  ],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostsComponent implements OnInit {

  postrecipeForm: FormGroup = new FormGroup({
    postContent: new FormControl('',[Validators.required,Validators.maxLength(2000)]),
    postImages: new FormControl(''),
  });

  users: any[] = [];

  canPost: boolean = true;
  imagePreviews: string[] = [];
  currentImageIndex: number = 0;

  client = new Client();
  account: any;

  formvalue: any;

  private post_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private userService: UsersService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddPostsComponent>,
    private appwriteService: AppwriteService // private closedialog : HomeFeedComponent
  ) {
    // Initialize the form with controls
    // this.postrecipeForm = new FormGroup({
    //   postContent: new FormControl('', [
    //     Validators.required,
    //     Validators.maxLength(2000),
    //   ]),
    // });
  }

  ngOnInit(): void {
    // this.userService.getUsersdata().subscribe({
    //   next: (response) => {
    //     this.users = response.data.data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching users:', error);
    //   },
    // });
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

      this.imagePreviews = []; // Clear previous previews
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string); // Add preview to the array
        };
        reader.readAsDataURL(file); // Read the image file
      });

      this.currentImageIndex = 0; // Reset the index when new images are uploaded
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

  postRecipe() {
    // * have to close the pop up and show a toast that the recipe has been posted
    // this.formvalue  = this.postrecipeForm.value
    if (this.postrecipeForm.invalid) {
      return alert('Please fill in all the required fields'); // Stop if form is invalid
    }
    const recipeData = {

      post_Content: this.postrecipeForm.get('postContent')?.value,
      post_Content_Pictures: this.postrecipeForm.get('postImages')?.value,

      // user_name:
      // user_bio:
      // post_comments:
      // post_likes:
      // post_saves:
    };

    this.appwriteService.postRecipe(recipeData).then(() => {
        this.dialogRef.close();
        this.post_snackBar.open('Recipe posted successfully!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      })
      .catch((error) => {
        this.post_snackBar.open(
          'Failed to post recipe. Please Post Later.','Close',{
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          }
        );
        console.error('Failed to post recipe:', error);
      });
    // this.dialogRef.close();
    console.log('Appwrite Service :: postRecipe() ::posted successfully & closed dialog');
  }

  

  onCancel(): void {
    console.log('Appwrite Service :: onCancel() ::');
    this.dialogRef.close();
  }
}
