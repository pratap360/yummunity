import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullpostService {
  private selectedPost: any = null;
  constructor() {}

  setPost(post: any) {
    this.selectedPost = post;
  }

  getPost() {
    return this.selectedPost;
  }
}
