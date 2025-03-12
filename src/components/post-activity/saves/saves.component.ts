import { AppwriteService } from './../../../lib/appwrite.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  @Input() postId!: string;

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
      // Get current user ID if not provided
      this.AppwriteService.getCurrentUser().subscribe((userData) => {
        this.userId = userData.user_tag;
        this.checkIfSaved();
      });
    }
  }

  checkIfSaved() {
    if (!this.userId || !this.postId) return;
    this.AppwriteService.getSavedPosts(this.userId, this.postId).subscribe(
      (response) => {
        this.saved = response.length > 0;
        this.saves = this.saved ? this.saves + 1 : this.saves - 1;
      },
      (error) => {
        console.error('Error checking if saved:', error);
      }
    );
  }

  toggleSave(): void {
    if (!this.userId) {
      this._snackBar.open('Please login to save posts', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      return;
    }

    if (!this.saved) {
      // Save the post
      this.AppwriteService.savePost(this.userId, this.postId).subscribe(() => {
        this.saved = true;
        this.saves = 1;

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
      });
    } else {
      // Remove the saved post
      this.AppwriteService.removeSavedPost(this.userId, this.postId).then(
        () => {
          this.saved = false;
          this.saves = 0;

          this._snackBar.open('Removed from your profile !!', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        }
      );
    }
  }

  // toggleSave(): void {
  //   this.saved = !this.saved;
  //   this.saves = this.saved ? this.saves + 1 : this.saves - 1;
  //   if (!this.saved) {
  //     this.AppwriteService.savePost(this.userId, this.postId);
  //     // this.AppwriteService.removeSavedPost(this.userId, this.postId);
  //     const snackBarRef = this._snackBar.open(
  //       'Saved to your profile !!',
  //       'SEE PROFILE',
  //       {
  //         horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition,
  //         duration: this.durationInSeconds * 1000,
  //       }
  //     );
  //     // Subscribe to the snackbar action to navigate to the profile page
  //     snackBarRef.onAction().subscribe(() => {
  //       this.router.navigate(['/account']);
  //     });
  //   } else {
  //     this.AppwriteService.removeSavedPost(this.userId, this.postId);
  //     // this.AppwriteService.savePost(this.userId, this.postId);
  //     this._snackBar.open('Removed from your profile !!', 'OK', {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: this.durationInSeconds * 1000,
  //     });
  //   }
  // }
}
