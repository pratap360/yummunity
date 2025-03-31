import { Component, inject, Input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlogActivityComponent } from '../../../../components/blog-activity/blog-activity.component';
import { SharePostComponent } from '../../../../components/post-activity/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '../../../interface/blog-post';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../interface/user-data';
import { ShareBlogPostComponent } from '../../../../components/blog-activity/share-blog-post/share-blog-post.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    BlogActivityComponent,
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  @Input() blogPosts: BlogPost[] = [];
  @Input() userData: any;
  @Input() alluserData: { [postId: string]: UserData } = {};

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);
  sharePost(blog: any): void {
    const shareUrl = `${window.location.origin}/user/${blog.user_tag}/blog_post/${blog.$id}`;
    if (!this.blogPosts) {
      console.error('Post ID is undefined in TextPostComponent');
      return;
    }

    const dialogRef = this.dialog.open(ShareBlogPostComponent, {
      restoreFocus: false,
      width: '500px',
      data: {
        postId: blog.$id,
        userTag: blog.user_tag,
        shareUrl: shareUrl,
      },
    });

    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}
