import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { RecipePost } from '../../../app/interface/recipe-post';
import { AppwriteService } from '../../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-share-post',
  standalone: true,
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.css',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharePostComponent{
  postData: RecipePost | null = null;
  postId!: string;
  shareUrl!: string;
  userTag!: string;

  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private appwriteService: AppwriteService,
    public dialogRef: MatDialogRef<SharePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.postId = data.postId;
    this.userTag = data.userTag;
    this.shareUrl = data.shareUrl;
  }
  
  copyToClipboard() {

    navigator.clipboard.writeText(this.shareUrl).then(() => {
      console.log('URL copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
    this._snackBar.open('Link copied to clipboard', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });

  }
}
