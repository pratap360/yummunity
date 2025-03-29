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
  @Input() blogpost!: any;
  blog_post_comments: number = 0;
  commentModalOpen = false;
  newComment = '';
  comments: string[] = [];

  userId: string = '';
  userData: { user_tag: string } = { user_tag: '' };
  
  constructor(
    public dialog: MatDialog,
    private AppwriteService: AppwriteService
  ) {}
  ngOnInit(): void {
    this.AppwriteService.getCurrentUserId().then((userId) => {
      this.userId = userId || '';
    });

    if (!this.blogpost) {
      console.error('Post is undefined in Blog Activity Component');
    } 

    if(this.blogpost && this.blogpost.blog_post_comments === undefined){
      this.blogpost.blog_post_comments = 0;
    }
  }

  openCommentModal(): void {
    if(!this.blogpost){
      console.error('No blog post is available to open comment modal');
      return;
    }

    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '500px', // Set the modal width
      data: {  blogpostId: this.blogpost.$id },
    });

    dialogRef.afterClosed().subscribe((BlogcommentCount: number) => {
      console.log('this is what i get in blog comment count', BlogcommentCount);
      if(BlogcommentCount !== undefined){
        console.log('updating blog comment count from', this.blog_post_comments, 'to', BlogcommentCount);
        this.blog_post_comments = BlogcommentCount;
        console.log('blog post after update:', this.blogpost);
      }
    });
  }



  get commentCount(): number {
    return this.comments.length;
  }
}
