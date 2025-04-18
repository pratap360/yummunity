import { Component, Inject, inject } from '@angular/core';
import { BlogPost } from '../../../app/interface/blog-post';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-share-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './share-blog-post.component.html',
  styleUrl: './share-blog-post.component.css',
})
export class ShareBlogPostComponent{
  blogPostData: BlogPost | null = null;
  blogPostId!: string;
  shareUrl!: string;
  userTag!: string;

  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShareBlogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blogPostId = data.blogPostId;
    this.userTag = data.userTag;
    this.shareUrl = data.shareUrl;
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.shareUrl)
      .then(() => {
        // console.log('URL copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
    this._snackBar.open('Link copied to clipboard', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
