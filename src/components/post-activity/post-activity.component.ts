import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommentsComponent } from './comments/comments.component';
import { LikesComponent } from './likes/likes.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { SavesComponent } from './saves/saves.component';
import { RecipePost } from '../../app/interface/recipe-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-activity',
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
    ReadMoreComponent,
  ],
  templateUrl: './post-activity.component.html',
  styleUrl: './post-activity.component.css',
})
export class PostActivityComponent {
  // @Input() post!: RecipePost;
  @Input() post: any;
  comments_counter = 0;
  commentModalOpen = false;
  newComment = '';

  comments: string[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}
  ngOnInit(): void {
    const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
    this.comments_counter = comments.length;

    if (!this.post) {
      console.log('getting the post data:', this.post);
      console.error('Post is undefined in PostActivityComponent');
    } else {
      console.log('Received Post in PostActivityComponent:', this.post);
    }
  }
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

  viewFullPost(documentId: string) {
    if (!this.post || !this.post.id || !this.post.users) {
      console.error('Post data is incomplete');
      return;
    }

    const userTag = this.post.users;
    const postId = this.post.id;

    this.router.navigate([`/user/${userTag}/${postId}`]);
  }

  get commentCount(): number {
    return this.comments.length;
  }
}
