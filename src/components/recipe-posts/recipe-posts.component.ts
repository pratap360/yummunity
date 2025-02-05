import { ChangeDetectionStrategy, Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { TextPostComponent } from './text-post/text-post.component';
import { WithImgPostComponent } from './with-img-post/with-img-post.component';
import { MatMenuModule } from '@angular/material/menu';
import { AppwriteService } from '../../lib/appwrite.service';
import { RecipePost } from '../../app/interface/recipe-post';
import { BlogPost } from '../../app/interface/blog-post';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-posts',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    BlogPostComponent,
    TextPostComponent,
    WithImgPostComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePostsComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: RecipePost[] = [];
  blogPosts: BlogPost[] = [];
  limit = 5;
  offset = 0;

  private postsSubscription: Subscription | undefined;
  constructor(private appwriteService: AppwriteService) {}

  ngOnInit(): void {
    this.fetchAllPosts();
    this.fetchBlogPosts();
  }

  fetchAllPosts(): void {

    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe(); // Unsubscribe from previous subscription
    }

    console.log('Fetching all posts');
    // this.isLoading = true;
    // setTimeout(() => {
      this.appwriteService.getAllPosts(this.limit, this.offset).subscribe({
        next: (data) => {
          console.log('Posts fetched:', data);
          // this.posts = data.documents;
          this.posts = [...this.posts, ...data.documents];
          this.offset += this.limit;
          this.isLoading = false;
          console.log('Spinner hidden');
          console.log('All Posts :', this.posts);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
          this.isLoading = false;
          console.log('Spinner hidden');
        },
      });
    // }, 2000);
  }

  fetchBlogPosts(): void {
    this.appwriteService.getBlogPosts().subscribe({
      next: (data) => {
        this.blogPosts = data.documents;
        console.log('All Blog Posts:', this.blogPosts);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }




  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isNearBottom() && !this.isLoading) {
      this.fetchAllPosts(); // Load more posts
    }
  }


  isNearBottom(): boolean {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    return scrollTop + clientHeight >= scrollHeight - 100; // Load more when 100px from bottom
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe(); // Unsubscribe from previous subscription
    }
  }
}

