import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { PostActivityComponent } from '../../post-activity/post-activity.component';
import { AppwriteService } from '../../../lib/appwrite.service';

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
  @Input() post: any;

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchPosts();
  }


  fetchPosts() {
    this.appwriteService.getPosts().subscribe(
      (response: any) => {
        this.post = response.documents; // Assign fetched posts to the `posts` array
        console.log('Fetched posts:', this.post);
      },
      (error: any) => {
        console.error('Failed to fetch posts:', error);
      }
    );
  }
}
