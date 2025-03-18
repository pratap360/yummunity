import { AppwriteService } from './../../../lib/appwrite.service';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../../app/interface/blog-post';
import { RecipePost } from '../../../app/interface/recipe-post';
@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css',
})
export class SavesComponent implements OnInit {
  @Input() saves: number = 0; // Change to input so parent can pass it
  @Input() saved: boolean = false; // Change to input
  @Input() userId: string = '';
  // @Input() postId!: string;
  @Input() blogpost!: any;
  // @Input() post: RecipePost | null = null;
  // @Input() blogpost: BlogPost | null = null;

  durationInSeconds = 5;
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private AppwriteService: AppwriteService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.checkIfSaved();      
    } else {
      this.AppwriteService.getCurrentUser().subscribe({
        next: (userData) => {
            this.userId = userData.user_tag;
            this.checkIfSaved();
        },
        error: (error) => {
          console.error('Error getting current user:', error);
        },
      });
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (
  //     (changes['post'] && changes['post'].currentValue) ||
  //     (changes['blogpost'] && changes['blogpost'].currentValue)
  //   ) {
  //     const postToCheck = this.post || this.blogpost;
  //     if (postToCheck) {
  //       console.log('Post received in SavesComponent:', postToCheck);

  //       // Check if ID exists
  //       if (postToCheck && !postToCheck.id && !postToCheck.$id) {
  //         console.warn('Post has no ID property:', postToCheck);
  //       }
  //       // Update save status and count
  //       this.checkIfSaved();
  //     }
  //   }
  // }
  checkIfSaved(): void {
    const postToCheck = this.blogpost;
    if (postToCheck && this.userId) {
      console.log('Checking if saved:', postToCheck, 'User ID:', this.userId);
      if(!postToCheck || (!postToCheck.id && !postToCheck.$id)){
        console.warn('Post has no ID property:', postToCheck);
        this.saved = false;
        return;
      }
      this.saved = this.AppwriteService.isPostSavedByUser(postToCheck,this.userId);
    }else{
      this.saved = false;
    }
  }

  toggleBlogSave(): void {
    console.log('Toggling save for blogpost:', this.blogpost);
    console.log('Current user ID at blog post save btn:', this.userId);
      // Check if blogpost exists and has an ID
  if (!this.blogpost || (!this.blogpost.id && !this.blogpost.$id)) {
    console.error('Blog post is missing or has no ID');
    this._snackBar.open('Error: Cannot save this post', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
    return;
  }

    
    // First check if user is logged in
    if (!this.userId) {
      console.log('Checking with the user id:', this.userId);
      this._snackBar.open('Please login to save posts', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

  

    // Store previous state
    const previousSavedState = this.saved;
    const previousSavesCount = this.saves;

    // Optimistically update UI
    this.saved = !this.saved;
    this.saves += this.saved ? 1 : -1;

    this.AppwriteService.toggleSaveBlog(this.blogpost, this.userId).subscribe({
      next: (updatedPost) => {
        console.log('Save status updated successfully for blog Post:',updatedPost);
        this.blogpost = updatedPost;
        this.saved = this.AppwriteService.isPostSavedByUser(this.blogpost,this.userId);

        this.saves = this.blogpost.blog_post_saves || 0;

        if (this.saved) {
          this._snackBar.open(
            'Saved to your profile !!',
            'SEE PROFILE',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            }
          ).onAction().subscribe(() => {
            this.router.navigate(['/account']);
          });
        } else {
          this._snackBar.open('Removed from your profile !!', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        }
      },

      error: (error) => {
        console.error('Error toggling save status:', error);

        // Revert UI changes on error
        this.saved = previousSavedState;
        this.saves = previousSavesCount;

        this._snackBar.open(
          'Error updating save status. Please try again.',
          'OK',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
      },
    });
  }
}
