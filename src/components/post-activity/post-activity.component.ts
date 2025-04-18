import { AppwriteService } from './../../lib/appwrite.service';
import { FullpostService } from './../../app/services/appwrite/fullpost/fullpost.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { BlogPost } from '../../app/interface/blog-post';

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
  @Input() post!: any;

  post_comments: number = 0;
  commentModalOpen = false;
  newComment = '';
  comments: string[] = [];

  userId: string = '';
  hasliked: boolean = false;
  userData: { user_tag: string } = { user_tag: '' };
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private FullpostService: FullpostService,
    private AppwriteService: AppwriteService
  ) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['post'] && changes['post'].currentValue) {
  //     console.log('Post received in Post-Activity-Component:', this.post);
  //   } else {
  //     console.error('Post is undefined in Post-Activity-Component');
  //   }
  // }

  ngOnInit(): void {
    this.AppwriteService.getCurrentUserId().then((userId) => {
      this.userId = userId || '';
      // this.hasLiked = this.post.likedBy?.includes(this.userId) || false;
    });

    // const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
    // this.comments_counter = comments.length;

    if (!this.post) {
      console.error('Post is undefined in Post-Activity-Component');
      // console.log('Post ID:', this.post.id);
    } else {
      // console.log('Received Post in Post-Activity-Component:', this.post);
    }

    if (this.post && this.post.post_comments === undefined) {
      this.post.post_comments = 0;
    }
  }

  async toggleLike() {
    if (!this.userId) {
      alert('You must be logged in to like posts!');
      return;
    }
    let updatedLikes = this.post.post_likes || 0;
    // let updatedLikedBy = [...(this.post.likedBy || [])];

    if (this.hasliked) {
      // User already liked → Remove like
      updatedLikes -= 1;
      // updatedLikedBy = updatedLikedBy.filter(id => id !== this.userId);
    } else {
      // User has not liked → Add like
      updatedLikes += 1;
      // updatedLikedBy.push(this.userId);
    }

    // Update in UI
    this.post.post_likes = updatedLikes;
    // this.hasLiked = !this.hasLiked;

    // Send to Appwrite Database
    if (this.post.id) {
      await this.AppwriteService.updateLikes(this.post.id, updatedLikes);
    } else {
      console.error('Post ID is undefined');
    }
  }

  openCommentModal(): void {
    if (!this.post) {
      console.error('No post available to open comment modal');
      return;
    }
  
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '500px', // Set the modal width
      data: {  postId: this.post.$id },
    });

    dialogRef.afterClosed().subscribe((commentCount: number) => {
      // console.log('Dialog closed with comment count:', commentCount);
      if (commentCount !== undefined) {
        // console.log('Updating post comments from', this.post.post_comments, 'to', commentCount);
        this.post.post_comments = commentCount;
        // console.log('Post after update:', this.post);
      }
    });

  }

  // viewFullPost(documentId: string) {
  //   if (!this.post || !this.post.id || !this.post.users) {
  //     console.error('Post data is incomplete');
  //     return;
  //   }

  //   const userTag = this.post.users;
  //   const postId = this.post.id;

  //   this.router.navigate([`/user/${userTag}/${postId}`]);
  // }

  // navigateToFullPost() {
  //   if (this.post) {
  //     this.FullpostService.navigateToFullPost(this.post);
  //   }
  // }


  get commentCount(): number {
    return this.comments.length;
  }
}
