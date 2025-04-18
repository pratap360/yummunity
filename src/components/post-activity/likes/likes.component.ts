import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppwriteService } from '../../../lib/appwrite.service';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css',
})
export class LikesComponent {
  @Input() likes: number = 0; // Change to input so parent can pass it
  @Input() liked: boolean = false; // Change to input
  @Input() userId: string = '';
  @Input() postId!: string;
  @Input() post!: any;

  durationInSeconds = 5;
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private AppwriteService: AppwriteService) {}

  ngOnInit(): void {
    if (this.userId) {
      // console.log('User ID is set at line 34:', this.userId);
      
      this.checkIfLiked();
    } else {
      this.AppwriteService.getCurrentUser().subscribe({
        next: (userData) => {
          this.userId = userData.user_tag;
          this.checkIfLiked();
        },
        error: (error) => {
          console.error('Error getting current user:', error);
        },
      });
    }
  }

  checkIfLiked() {
    const postTocheck = this.post;
    if (postTocheck && this.userId) {
      this.liked = this.AppwriteService.isPostLikedByUser(
        postTocheck,
        this.userId
      );

      if (this.post) {
        this.likes = this.post.post_likes || 0;
      }
    }
  }

  // toggleLike(): void {
  //   this.liked = !this.liked;
  //   this.likes = this.liked ? this.likes + 1 : this.likes - 1;
  // }

  toggleLike(): void {
    // console.log('Toggling Like for post:', this.post);
    // console.log('Current user ID on Like:', this.userId);

    if (!this.userId) {
      // console.log('Checking with the user id:', this.userId);
      this._snackBar.open('Please login to Like posts', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }
    // console.log('Full post object:', JSON.stringify(this.post));

    const postToLike = this.post;
    // console.log('Post to like:', postToLike);
    
    // Check if any post exists
    if (!postToLike) {
      console.error('Post is undefined');
      this._snackBar.open('Error: Unable to save post', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

    const LikedpostId = postToLike.id || postToLike.$id;
    if (!LikedpostId) {
      console.error('Post is missing ID:', LikedpostId);
      this._snackBar.open('Error: Unable to save post (missing ID)', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

    const previousLikedState = this.liked;
    const previouslikesCount = this.likes;

    this.liked = !this.liked;
    this.likes = this.liked ? this.likes + 1 : this.likes - 1;

    const postActualId = {
      ...postToLike,
      id: LikedpostId,
      $id: LikedpostId,
    };

    this.AppwriteService.toggleLikePost(postActualId, this.userId).subscribe({
      next: (likedPost) => {
        this.post = likedPost;

        this.liked = this.AppwriteService.isPostLikedByUser(
          this.post,
          this.userId
        );
        this.likes = this.post.post_likes || 0;

        if (this.liked === true) {
          this._snackBar.open('Post liked ❤', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        }else{
          this._snackBar.open('Post unliked 💔', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        }
      },
      error: (error) => {
        console.error('error toggleLike:', error);

        this.liked = previousLikedState;
        this.likes = previouslikesCount;

        this._snackBar.open('Error updating like status', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
    });
  }

  isPostLikedByUser(post: any, userId: string): boolean {
    return this.AppwriteService.isPostLikedByUser(post, userId);
  }
}
