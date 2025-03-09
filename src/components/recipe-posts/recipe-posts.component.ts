import { UsercontextService } from './../../app/services/users/usercontext.service';
import { UserData } from './../../app/interface/user-data';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  Input,
} from '@angular/core';
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
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { catchError, tap, throttleTime, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FullPostComponent } from '../full-post/full-post.component';
import { use } from 'marked';

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
    RouterModule,
    FullPostComponent,
  ],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePostsComponent implements OnInit, OnDestroy {
  // isLoading = false;
  isLoading = new BehaviorSubject<boolean>(false);
  posts: RecipePost[] = [];
  blogPosts: BlogPost[] = [];

  // userData: any[] = [];
  // userData!: UserData;
  user: any;
  // userDataMap: { [postId: string]: UserData } = {};

  limit = 5;
  offset = 0;
  allPostsLoaded = false;

  textPosts: any[] = [];
  withImgPosts: any[] = [];

  private postsSubscription: Subscription | undefined;
  constructor(
    private appwriteService: AppwriteService,
    private router: Router,
    private userContextService: UsercontextService
  ) {}

  ngOnInit(): void {
    this.fetchAllPosts();
    this.fetchBlogPosts();
    this.setupScrollListener();
  }
  private setupScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(250), // Only emit once every 250ms
        filter(
          () =>
            this.isNearBottom() && !this.isLoading.value && !this.allPostsLoaded
        ), //check for isLoading and allpostLoaded
        tap(() => this.fetchAllPosts())
      )
      .subscribe();
  }
  fetchAllPosts(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe(); // Unsubscribe from previous subscription
    }

    console.log('Fetching all posts');
    this.isLoading.next(true);

    // setTimeout(() => {
    this.postsSubscription = this.appwriteService
      .getAllPosts(this.limit, this.offset)
      .pipe(
        catchError((error) => {
          console.error('Error fetching posts:', error);
          this.isLoading.next(false);
          return of({ documents: [] }); // Return empty data to prevent errors
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Posts fetched:', data);
          // this.posts = data.documents;
          if (data.documents.length < this.limit) {
            this.allPostsLoaded = true; //all post are loaded
          }

          const userDataMap: { [postId: string]: UserData } = {};
          data.documents.forEach((post) => {
            if (post.users && post.users.length > 0) {
              userDataMap[post.$id || post.id] = {
                id: post.users[0].id,
                user_tag: post.users[0].user_tag,
                user_name: post.users[0].user_name,
                user_bio: post.users[0].user_bio,
                user_profile_pic: post.users[0].user_profile_pic,
                user_dob: post.users[0].user_dob,
                user_gender: post.users[0].user_gender,
                user_phone_no: post.users[0].user_phone_no,
                user_email: post.users[0].user_email,
                user_password: post.users[0].user_password,
                user_location: post.users[0].user_location,
                user_url: post.users[0].user_url,
                user_fav_food_recipe: post.users[0].user_fav_food_recipe,
                yummunity_rating: post.users[0].yummunity_rating,
                user_following_count: post.users[0].user_following_count,
                user_followers_count: post.users[0].user_followers_count,
              };
            }
          });

          // Update user context service
          this.userContextService.updateBulkPostUserData(userDataMap);

          this.posts = [...this.posts, ...data.documents];
          this.offset += this.limit;

          this.isLoading.next(false);
          console.log('All Posts:', this.posts);

          this.textPosts = (this.posts || []).filter(
            (post) => !post.post_Content_Pictures
          );
          this.withImgPosts = (this.posts || []).filter(
            (post) => post.post_Content_Pictures
          );
          this.isLoading.next(false);
          // data.documents.forEach((post) => {
          //   if (post.users && post.users.length > 0) {
          //     this.userDataMap[post.id] = {
          //       id: post.users[0].id,
          //       user_tag: post.users[0].user_tag,
          //       user_name: post.users[0].user_name,
          //       user_bio: post.users[0].user_bio,
          //       user_profile_pic: post.users[0].user_profile_pic,

          //       user_dob: post.users[0].user_dob,
          //       user_gender: post.users[0].user_gender,
          //       user_phone_no: post.users[0].user_phone_no,
          //       user_email: post.users[0].user_email,
          //       user_password: post.users[0].user_password,
          //       user_location: post.users[0].user_location,
          //       user_url: post.users[0].user_url,
          //       user_fav_food_recipe: post.users[0].user_fav_food_recipe,
          //       yummunity_rating: post.users[0].yummunity_rating,
          //       user_following_count: post.users[0].user_following_count,
          //       user_followers_count: post.users[0].user_followers_count,
          //     };
          //   }
          // });

          // this.userData = this.posts.map((post) => ({
          //   user_name: post.users?.[0]?.user_name,
          //   user_bio: post.users?.[0]?.user_bio,
          //   user_profile_pic: post.users?.[0]?.user_profile_pic,
          //   user_tag: post.users?.[0].user_tag,
          // }));

          // this.userData = this.posts.map((post) => ({
          //   user_tag: post && post.users[0].user_tag,
          //   user_name: post && post.users[0].user_name,
          //   user_bio: post && post.users[0].user_bio,
          //   user_profile_pic: post && post.users[0].user_profile_pic,
          // }));
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
          this.isLoading.next(false);
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

  // @HostListener('window:scroll', ['$event'])
  // onScroll(): void {
  //   if (this.isNearBottom() && !this.isLoading.value) {
  //     // setTimeout(() => this.fetchAllPosts(), 500);
  //     this.fetchAllPosts();
  //   }
  // }

  isNearBottom(): boolean {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollThreshold = 200; // Increased threshold to 200px
    return scrollTop + clientHeight >= scrollHeight - scrollThreshold;
  }

  navigateToFullPost(posts: any) {
    const userTag = posts.users;
    const postId = posts.id;
    this.router.navigate([`/user/${userTag}/${postId}`]);
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
