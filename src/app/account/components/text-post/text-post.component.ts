import { CommonModule } from '@angular/common';
import { Component, inject, Input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PostActivityComponent } from './../../../../components/post-activity/post-activity.component';
import { SharePostComponent } from '../../../../components/post-activity/share-post/share-post.component';
import { RecipePost } from '../../../interface/recipe-post';
import { MarkdownModule } from 'ngx-markdown';
import { UserData } from '../../../interface/user-data';

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
export class TextPostComponent {
  // comments_counter = 0;

  // constructor(public dialog: MatDialog) {}

  // ngOnInit(): void {
  //   const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
  //   this.comments_counter = comments.length;
  // }
  // @Input() postsId: any;
  @Input() posts: RecipePost[] = [];
  // user_name: string = 'Pratap Parui';
  // user_bio: string = 'Developer|Food Critics';
  // post_id: string = '678ea60e001c28e7b3f9';
  // constructor(private appwriteService: AppwriteService) {}
  // ngOnInit(): void {
  //   this.fetchAllPosts();
  // }
  @Input() userData: any;
  @Input() alluserData: { [postId: string]: UserData } = {};

  ngOnInit(): void {
    console.log('Post id is there on text-post:', this.posts);
    console.log('User data in text-post:', this.userData);
  }

  // @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  sharePost() {
    const dialogRef = this.dialog.open(SharePostComponent, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}
