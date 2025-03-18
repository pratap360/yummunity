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
  @Input() post!: any;

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
    const postToCheck = this.post
    if (postToCheck && this.userId) {
      console.log('Checking if saved:', postToCheck, 'User ID:', this.userId);
      this.saved = this.AppwriteService.isPostSavedByUser(postToCheck,this.userId);

      // Set the saves count based on post type
      if (this.post) {
        this.saves = this.post.post_saves || 0;
      }
    }
  }


  toggleSave(): void {
    // debugger;
    console.log('Toggling save for post:', this.post);
    console.log('Current user ID on post save:', this.userId);
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

    // Check both post and blogpost objects

    console.log('this.post:', this.post);
    const postToSave = this.post 
    // Check if any post exists
    if (!postToSave) {
      console.error('Post and blogpost are both undefined');
      this._snackBar.open('Error: Unable to save post', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

    const postId = postToSave.id || postToSave.$id;
    if (!postId) {
      console.error('Post is missing ID:', postToSave);
      this._snackBar.open('Error: Unable to save post (missing ID)', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

    const previousSavedState = this.saved;
    const previousSavesCount = this.saves;

    // Optimistically update the UI
    this.saved = !this.saved;
    this.saves = this.saved ? this.saves + 1 : this.saves - 1;

    // Create a copy of the post with a consistent ID format
    const postWithConsistentId = {
      ...postToSave,
      id: postId,
      $id: postId, // Add both formats to ensure consistency
    };

    this.AppwriteService.toggleSavePost(
      postWithConsistentId,
      this.userId
    ).subscribe({
      next: (updatedPost) => {
        // console.log('Updated post:', updatedPost);
          this.post = updatedPost;
      
        const currentPost =  this.post;
        this.saved = this.AppwriteService.isPostSavedByUser(currentPost,this.userId);
        this.saves = this.post.post_saves || 0;
        // console.log(this.saved);
        
        if (this.saved === true) {
          const snackBarRef = this._snackBar.open(
            'Saved to your profile !!',
            'SEE PROFILE',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            }
          );

          snackBarRef.onAction().subscribe(() => {
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
