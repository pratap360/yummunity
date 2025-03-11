import { FullpostService } from './../../../app/services/appwrite/fullpost/fullpost.service';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

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
  @Input() post: any;

  // constructor(private FullpostService: FullpostService) {}
  constructor(
    private router: Router,
    private FullpostService: FullpostService
  ) {}
  ngOnInit() {}
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

  navigateToFullPost() {
    // if (!this.post || !this.post.id) {
    if (!this.post) {
      console.error('Post does not have an ID');
      return;
    }
    console.log('Storing Post Data in Service:', this.post);
    this.FullpostService.setPost(this.post);
    console.log('Navigating to full post with ID:', this.post.id);
    this.router.navigate(['/full-post', this.post.id]);
  }

  // viewFullPost() {
  //   console.log('clicked on read more', this.post.id);
  //   if (this.post) {
  //     this.FullpostService.navigateToFullPost(this.post);
  //     console.log('clicked on read more', this.post.users);
  //   }

  // if (!this.postData || !this.postData.$id) {
  //   console.error('Invalid post data');
  //   return;
  // }

  // this.FullpostService.setPost(this.postData);
  // this.router.navigate(['user/:user_tag/', this.postData.$id]);
  // this.router.navigate(['/user', this.post.user_name, this.post.$id]);
  // }
}
