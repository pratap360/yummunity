import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PostActivityComponent } from './../../../../components/post-activity/post-activity.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { SharePostComponent } from '../../../../components/post-activity/share-post/share-post.component';
import { CommonModule } from '@angular/common';
import { RecipePost } from '../../../interface/recipe-post';
import { MarkdownModule } from 'ngx-markdown';
import { UserData } from '../../../interface/user-data';
import { UsercontextService } from '../../../services/users/usercontext.service';

@Component({
  selector: 'app-with-img-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatMenuTrigger,
    MatDialogContent,
    MatDialogActions,
    PostActivityComponent,
    MarkdownModule,
  ],
  templateUrl: './with-img-post.component.html',
  styleUrl: './with-img-post.component.css',
})
export class WithImgPostComponent implements OnInit {
  @Input() posts: RecipePost[] = [];
  @Input() userData: any;
  // @Input() alluserData: { [postId: string]: UserData } = {};
  postUserData: { [postId: string]: UserData } = {};

  maxLength = 250; // Characters to show before "Read More"
  expandedPosts: { [postId: string]: boolean } = {}; // Track expanded state by post ID
  
  constructor(private UserContextService: UsercontextService) {}
  ngOnInit(): void {
    this.UserContextService.postUserData$.subscribe((data) => {
      this.postUserData = data;
    });
    console.log('Post id is there on text-post:', this.posts);
    console.log('User data in text-post:', this.userData);
  }

  getUserData(postId: string): UserData {
    return this.postUserData[postId] || {};
  }

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  sharePost(post:any): void {
    const shareUrl = `${window.location.origin}/user/${post.user_tag}/post/${post.$id}`;
   if(!this.posts){
     console.error('Post ID is undefined in WithImgPostComponent');
     return;
   }

   const dialogRef = this.dialog.open(SharePostComponent, {
     restoreFocus: false,
     width: '500px',
     data: {
       postId: post.$id,
       userTag: post.user_tag,
       shareUrl: shareUrl
     },
   });

   dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
 }

 shouldTruncate(content: string): boolean {
  return content.length > this.maxLength;
}

// Method to get truncated content
getTruncatedContent(content: string): string {
  if (this.shouldTruncate(content)) {
    return content.substring(0, this.maxLength) + '...';
  }
  return content;
}

// Toggle expanded state
toggleExpand(postId: string): void {
  this.expandedPosts[postId] = !this.expandedPosts[postId];
}

// Check if post is expanded
isExpanded(postId: string): boolean {
  return this.expandedPosts[postId] === true;
}

}
