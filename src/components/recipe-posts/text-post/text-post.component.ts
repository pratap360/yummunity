import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PostActivityComponent } from '../../post-activity/post-activity.component';
import { AppwriteService } from '../../../lib/appwrite.service';
import { SharePostComponent } from '../../post-activity/share-post/share-post.component';
import { RecipePost } from '../../../app/interface/recipe-post';
import { MarkdownModule } from 'ngx-markdown';
import { UserData } from '../../../app/interface/user-data';

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
    MatMenuModule,
    PostActivityComponent,
    MarkdownModule,
  ],
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css',
})
export class TextPostComponent implements OnInit {

  @Input() posts: RecipePost[] = [];

  @Input() userData: any;
  @Input() alluserData: { [postId: string]: UserData } = {};

  ngOnInit(): void {
    // console.log('Post id is there on text-post:', this.posts);
    // console.log('User data in text-post:', this.userData);
  }

  // @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  sharePost(post:any): void {
    const shareUrl = `${window.location.origin}/user/${post.user_tag}/post/${post.$id}`;
   if(!this.posts){
     console.error('Post ID is undefined in TextPostComponent');
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
}
