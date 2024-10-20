import { CommonModule } from '@angular/common';
import { Component,Inject   } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent  {
  newComment = '';
  commentModalOpen = false;
  comments = 0;


  constructor(
  public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // onPostComment(): void {
  //   if (this.newComment.trim()) {
  //         this.comments++;
  //         this.newComment = '';
  //         this.dialogRef.close(this.newComment);
  //       }
  // }

    closeCommentModal(): void {
    this.commentModalOpen = false;
  }
  postComment(): void {
    if (this.newComment.trim()) {
      this.comments++;
      this.newComment = '';
      this.closeCommentModal();
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without doing anything
  }

  // closeCommentModal(): void {
  //   this.commentModalOpen = false;
  // }
  // postComment(): void {
  //   if (this.newComment.trim()) {
  //     this.comments++;
  //     this.newComment = '';
  //     this.closeCommentModal();
  //   }
  // }
}
