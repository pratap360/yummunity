import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RecipePost } from '../../../app/interface/recipe-post';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css',
})
export class ReadMoreComponent implements OnInit {
  @Input() post!: RecipePost;
  @Input() documentId!: string;
  @Output() readMoreClicked = new EventEmitter<string>();
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Received documentId in ReadMoreComponent:', this.post);
    console.log('Received documentId in ReadMoreComponent:', this.documentId);
  }
  // navigateToPost(): void {
  //   const postId = this.generatePostId();
  //   const username = 'user_name';
  //   window.location.href = `/@${username}/post/${postId}`;
  //   window.location.href = `http://localhost:4200/@${username}/post/${postId}`;
  // }

  // generatePostId(): string {
  //   return Math.random().toString(36).substring(2, 12);
  // }

  // goToPost(documentId:string): void {
  //   console.log(documentId);
  //   this.router.navigate(['/post', documentId]);
  // }

  viewFullPost() {
    if (!this.post || !this.post.id || !this.post.users) {
      console.error('Post data is incomplete:', this.post);
      return;
    }

    const userTag = this.post.users;
    const postId = this.post.id;

    console.log(`Navigating to user/${userTag}/${postId}`);
    this.router.navigate([`/user/${userTag}/${postId}`]);
    this.readMoreClicked.emit(postId);
  }
}
