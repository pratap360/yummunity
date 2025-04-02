import { Component, inject, Input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { BlogActivityComponent } from '../../blog-activity/blog-activity.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '../../../app/interface/blog-post';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../app/interface/user-data';
import { UsercontextService } from '../../../app/services/users/usercontext.service';
import { ShareBlogPostComponent } from '../../blog-activity/share-blog-post/share-blog-post.component';
import { Router } from '@angular/router';

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

  constructor(private UserContextService: UsercontextService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.UserContextService.postUserData$.subscribe((data) => {
      this.alluserData = data;
    });
    console.log('Post id is there on text-post:', this.blogPosts);
    console.log('User data in blog-post:', this.userData);

  }

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);


  sharePost(blog:any): void {
    const shareUrl = `${window.location.origin}/user/${blog.user_tag}/blog_post/${blog.$id}`;
   if(!this.blogPosts){
     console.error('Post ID is undefined in TextPostComponent');
     return;
   }

   const dialogRef = this.dialog.open(ShareBlogPostComponent, {
     restoreFocus: false,
     width: '500px',
     data: {
       postId: blog.$id,
       userTag: blog.user_tag,
       shareUrl: shareUrl
     },
   });

   dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
 }

 goToProfile(userTag: string): void {
  console.log('Navigating to user profile:', userTag);
  this.router.navigate(['/user', userTag]);
 }
}
