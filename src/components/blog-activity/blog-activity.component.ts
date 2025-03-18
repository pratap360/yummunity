import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LikesComponent } from '../blog-activity/likes/likes.component';
import { CommentsComponent } from '../blog-activity/comments/comments.component';
import { SavesComponent } from '../blog-activity/saves/saves.component';
import { BlogPost } from '../../app/interface/blog-post';
import { AppwriteService } from '../../lib/appwrite.service';
@Component({
  selector: 'app-blog-activity',
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
    LikesComponent,
    CommentsComponent,
    SavesComponent,
  ],
  templateUrl: './blog-activity.component.html',
  styleUrl: './blog-activity.component.css',
})
export class BlogActivityComponent {
  comments_counter = 0;
  commentModalOpen = false;
  newComment = '';

  @Input() blogpost!: BlogPost;

  userId: string = '';
  userData: { user_tag: string } = { user_tag: '' };
  
  comments: string[] = [];
  constructor(
    public dialog: MatDialog,
    private AppwriteService: AppwriteService
  ) {}
  ngOnInit(): void {
    this.AppwriteService.getCurrentUserId().then((userId) => {
      this.userId = userId || '';
      // this.userData.user_tag = userId || '';
      // this.checkIfSaved();
    });

    const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
    this.comments_counter = comments.length;

    if (!this.blogpost) {
      console.error('Post is undefined in Blog Activity Component');
    } 
  }

  // checkIfSaved(): void {
  //   if (this.blogpost && this.userId) {
  //     // Check if the post is saved by the current user
  //     this.AppwriteService.isPostSavedByUser(this.blogpost, this.userId);
  //   }
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
    });
  }

  get commentCount(): number {
    return this.comments.length;
  }
}
