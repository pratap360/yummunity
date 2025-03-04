import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipePost } from '../../../interface/recipe-post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FullpostService {
  // private selectedPost: any = null;
  // constructor() {}
  // setPost(post: any) {
  //   this.selectedPost = post;
  // }
  // getPost() {
  //   return this.selectedPost;
  // }

  private currentPostSource = new BehaviorSubject<RecipePost | null>(null);
  currentPost$ = this.currentPostSource.asObservable();

  constructor(private router: Router) {}

  navigateToFullPost(post: RecipePost) {
    if (!post.id) {
      console.error('Post does not have an ID');
      return;
    }
    this.currentPostSource.next(post);
    // this.router.navigate(['user/:user_tag/', post.id]);
    this.router.navigate(['/fullpost', post.id]);
  }

  getCurrentPost(): RecipePost | null {
    return this.currentPostSource.value;
  }

  clearCurrentPost() {
    this.currentPostSource.next(null);
  }
}
