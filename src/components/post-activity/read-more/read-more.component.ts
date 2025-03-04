import { FullpostService } from './../../../app/services/appwrite/fullpost/fullpost.service';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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

  constructor(private FullpostService: FullpostService) {}

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

  viewFullPost() {
    debugger;
    console.log('clicked on read more', this.post.id);
    if (this.post) {
      this.FullpostService.navigateToFullPost(this.post);
      console.log('clicked on read more', this.post.users);
    }

    // if (!this.postData || !this.postData.$id) {
    //   console.error('Invalid post data');
    //   return;
    // }

    // this.FullpostService.setPost(this.postData);
    // this.router.navigate(['user/:user_tag/', this.postData.$id]);
    // this.router.navigate(['/user', this.post.user_name, this.post.$id]);
  }
}
