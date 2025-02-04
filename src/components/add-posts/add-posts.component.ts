import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, Account } from 'appwrite';
import { HomeFeedComponent } from '../../app/home-feed/home-feed.component';
import { AppwriteService } from '../../lib/appwrite.service';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Tag {
  name: string;
}

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
    MatChipsModule,

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
  users: any[] = [];

  canPost: boolean = true;
  imagePreviews: string[] = [];
  currentImageIndex: number = 0;

  client = new Client();
  account: any;

  formvalue: any;

  isBlogMode = false;
  linkPreviewError = false;

  @ViewChild('fileInput') fileInput: any;
  thumbnailPreview: string[] = [];

  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA] as const;
  blogTags = signal<Tag[]>([]);
  announcer = inject(LiveAnnouncer);

  private post_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddPostsComponent>,
    private appwriteService: AppwriteService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  private initializeForm() {
    this.postRecipeForm = this.fb.group({
      postContent: ['', Validators.required],
      postImages: [null],
    });

    // this is for blog post
    this.postBlogForm = this.fb.group({
      blogTitle: [''],
      blogLink: [''],
      summary: [''],
      blogTags: [''],
      blogThumbnail: [''],
    });
  }

  toggleBlogMode() {
    this.isBlogMode = !this.isBlogMode;
    if (this.isBlogMode) {
      this.postRecipeForm.get('postContent')?.disable();

      this.postBlogForm.get('blogTitle')?.enable();
      this.postBlogForm.get('blogLink')?.enable();
      this.postBlogForm.get('summary')?.enable();
      this.postBlogForm.get('blogTags')?.enable();
      this.postBlogForm.get('blogThumbnail')?.enable();

      this.postBlogForm.get('blogTitle')?.setValidators([Validators.required]);
      this.postBlogForm.get('blogLink')?.setValidators([Validators.required]);
      this.postBlogForm
        .get('summary')
        ?.setValidators([Validators.maxLength(200)]);
      // this.postBlogForm
      //   .get('blogTags')
      //   ?.setValidators([Validators.maxLength(3)]);
      // this.postBlogForm.get('blogThumbnail')?.setValidators([Validators.required]);
    } else {
      this.postRecipeForm.get('postContent')?.enable();

      this.postBlogForm.get('blogTitle')?.disable();
      this.postBlogForm.get('blogLink')?.disable();
      this.postBlogForm.get('summary')?.disable();
      this.postBlogForm.get('blogTags')?.disable();
      this.postBlogForm.get('blogThumbnail')?.disable();

      this.postBlogForm.get('blogTitle')?.clearValidators();
      this.postBlogForm.get('blogLink')?.clearValidators();
      this.postBlogForm.get('summary')?.clearValidators();
      this.postBlogForm.get('blogTags')?.clearValidators();
      this.postBlogForm.get('blogThumbnail')?.clearValidators();
    }
    this.postBlogForm.get('blogLink')?.updateValueAndValidity();
  }

  postRecipeForm: FormGroup = new FormGroup({
    postContent: new FormControl('', [
      Validators.required,
      Validators.maxLength(2000),
    ]),
    postImages: new FormControl(''),
  });

  postBlogForm: FormGroup = new FormGroup({
    blogTitle: new FormControl(''),
    blogLink: new FormControl('', [Validators.required]),
    summary: new FormControl(''),
    blogTags: new FormControl(''),
    blogThumbnail: new FormControl('', [Validators.required]),
  });

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
    // this.formvalue  = this.postRecipeForm.value
    if (this.postRecipeForm.invalid) {
      return alert('Please fill in all the required fields'); // Stop if form is invalid
    }

    const files = (document.getElementById('uploadImage') as HTMLInputElement)
      .files;

    const fileArray = files ? Array.from(files) : [];
    if (fileArray.length > 4) {
      return alert('You can only upload a maximum of 4 images');
    }

    // const recipeData = {
    //   post_Content: this.postRecipeForm.get('postContent')?.value,
    //   post_Content_Pictures: this.postRecipeForm.get('postImages')?.value,

    //   // user_name:
    //   // user_bio:
    //   // post_comments:
    //   // post_likes:
    //   // post_saves:
    // };

    this.appwriteService
      .uploadFiles(fileArray)
      .then((imageUrls) => {
        const recipeData = {
          post_Content: this.postRecipeForm.get('postContent')?.value,
          post_Content_Pictures: imageUrls, // Use uploaded image URLs
        };

        return this.appwriteService.createPost(recipeData);
      })
      .then(() => {
        this.dialogRef.close();
        this.post_snackBar.open('Recipe posted successfully!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error('Failed to post recipe:', error);
        this.post_snackBar.open(error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      });
  }

  postBlog() {
    if (this.postBlogForm.untouched) {
      return alert('Please fill in all the required fields'); // Stop if form is invalid
    }
    const tagsArray = this.blogTags().map(tag => tag.name);


    const thumbnail = (
      document.getElementById('blogThumbnail') as HTMLInputElement
    ).files;

    const thumbnailArray = thumbnail ? Array.from(thumbnail) : [];

    this.appwriteService
      .uploadFiles(thumbnailArray)
      .then((thumbnailUrls) => {
        const blogData = {
          blog_post_title: this.postBlogForm.get('blogTitle')?.value,
          blog_post_link: this.postBlogForm.get('blogLink')?.value,
          blog_post_summary: this.postBlogForm.get('summary')?.value,
          blog_post_tags: tagsArray,
          // blog_post_tags: this.blogTags(),
          // blog_post_tags: this.postBlogForm.get('blogTags')?.value,
          blog_post_thumbnail: thumbnailUrls,
        };

        return this.appwriteService.createBlogPost(blogData);
      })
      .then(() => {
        this.dialogRef.close();
        this.post_snackBar.open('Blog posted successfully!', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error('Failed to post blog:', error);
        this.post_snackBar.open(error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
        });
      });
    // console.table(this.postBlogForm.value);
    console.log('post Blog is working');
    console.log('Blog Title:', this.postBlogForm.get('blogTitle')?.value);
    console.log('Blog Link:', this.postBlogForm.get('blogLink')?.value);
    console.log('Summary:', this.postBlogForm.get('summary')?.value);
    console.log('Blog Tags:', tagsArray);
    console.log(
      'Blog Thumbnail:',
      this.postBlogForm.get('blogThumbnail')?.value
    );
  }

  // 👇 this is for input chips methods
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.blogTags.update((blogTags) => [...blogTags, { name: value }]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  remove(tag: Tag): void {
    this.blogTags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      const newTags = [...tags];
      newTags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return newTags;
    });
  }
  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }

    this.blogTags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  onCancel(): void {
    console.log('Appwrite Service :: onCancel() ::');
    this.dialogRef.close();
  }

  onBlogThumbnail(event: any): void {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailPreview = [e.target.result];
      };
      reader.readAsDataURL(files[0]);
    }
  }

  removeBlogThumbnail(index: number): void {
    this.thumbnailPreview.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }
}
