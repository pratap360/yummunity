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

  navigateToFullPost(post: any): void {

    // const readMoreUrl = `${window.location.origin}/user/${post.user_tag}/post/${post.$id}`
    const readMoreUrl = `/user/${post.user_tag}/post/${post.$id}`

    if (!this.post) {
      console.error('Post does not have an ID');
      return;
    }
    // console.log('Storing Post Data in Service:',readMoreUrl);
    // this.FullpostService.setPost(readMoreUrl);
    // console.log('Navigating to full post with ID:', this.post.id);
    this.router.navigate([readMoreUrl]);
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
