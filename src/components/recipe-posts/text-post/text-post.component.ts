import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommentsComponent } from '../../post-activity/comments/comments.component';

@Component({
  selector: 'app-text-post',
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
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css',
})
export class TextPostComponent {
  likes = 0;
  liked = false;

  comments_counter = 0;
  commentModalOpen = false;
  newComment = '';

  saves = 0;
  saved = false;
  comments: string[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
    this.comments_counter = comments.length;
  }
  


  toggleLike(): void {
    this.liked = !this.liked;
    this.likes = this.liked ? this.likes + 1 : this.likes - 1;
  }

  // openCommentModal(): void {
  //   this.commentModalOpen = true;
  // }

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

  toggleSave(): void {
    this.saved = !this.saved;
    this.saves = this.saved ? this.saves + 1 : this.saves - 1;
  }

  navigateToPost(): void {
    const postId = this.generatePostId();
    const username = 'user_name';
    window.location.href = `/@${username}/post/${postId}`;
    // window.location.href = `http://localhost:4200/@${username}/post/${postId}`;
  }

  generatePostId(): string {
    return Math.random().toString(36).substring(2, 12);
  }

  // onAddPost(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(CommentsComponent, {
  //     width: '800px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  // openCommentModal() {
  //   // this.commentModalOpen = true;
  //   const dialogRef = this.dialog.open(CommentsComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openCommentModal(): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '500px', // Set the modal width
      data: { postId: 1 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.comments_counter = result;
        console.log('Posted comment:', result);
      }
      // const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
      // this.comments_counter = comments.length;
      // console.log('Posted comment:', this.comments_counter);
    });
  }

  get commentCount(): number {
    return this.comments.length;
  }
}
