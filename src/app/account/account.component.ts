import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  inject,
} from '@angular/core';
// import { SideNavBarComponent } from '../../components/side-nav-bar/side-nav-bar.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { NotificationComponent } from '../notification/notification.component';
import { SearchComponent } from '../search/search.component';
import { HomeFeedComponent } from '../home-feed/home-feed.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { BlogPostComponent } from '../../components/recipe-posts/blog-post/blog-post.component';
import { TextPostComponent } from '../../components/recipe-posts/text-post/text-post.component';
import { WithImgPostComponent } from '../../components/recipe-posts/with-img-post/with-img-post.component';
import { PostContainerComponent } from '../../components/post-container/post-container.component';
import { PostActivityComponent } from '../../components/post-activity/post-activity.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { SavesComponent } from '../../components/post-activity/saves/saves.component';
import { AppwriteService } from '../../lib/appwrite.service';
import { BlogPost } from '../interface/blog-post';
import { RecipePost } from '../interface/recipe-post';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { UserData } from '../interface/user-data';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    // SideNavBarComponent,
    CommonModule,
    SidenavComponent,
    RecipePostsComponent,
    SearchComponent,
    NotificationComponent,
    HomeFeedComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BlogPostComponent,
    TextPostComponent,
    WithImgPostComponent,
    PostContainerComponent,
    PostActivityComponent,
    BottomNavComponent,
    SavesComponent,
    RouterModule,
    RouterOutlet,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  // account info
  // MonthNames = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];

  // Month = this.MonthNames[new Date().getMonth()];

  selectedTabIndex = signal(0);
  posts: RecipePost[] = [];
  blogPosts: BlogPost[] = [];
  userData!: UserData;

  profileUserId: string = '';
  isLoading = new BehaviorSubject<boolean>(false);
  limit = 5;

  durationInSeconds = 5;
  private router = inject(Router);
  private account_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private appwriteService: AppwriteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.allPostsData();
    // this.fetchBlogPosts();
    this.loggedInUserData();
  }

  // async LoggedInUserData(): Promise<void> {
  //   try {
  //     this.userData = await this.appwriteService.getCurrentUser();
  //   } catch (error) {
  //     console.error('Error loading user data:', error);
  //   }
  // }

  loggedInUserData(): void {
    this.isLoading.next(true);
    setTimeout(() => {
      this.isLoading.next(false);
    }, 1000);
    this.appwriteService.getCurrentUser().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('User Data:', this.userData);

        this.profileUserId = this.userData.id!;
        this.allPostsData();
        this.fetchBlogPosts();

        this.isLoading.next(false);
      },
      error: (error) => {
        this.isLoading.next(false);
        console.error('getting error on method loggedInUserData()', error);
        const snackBarRef = this.account_snackBar.open(
          'Your Session has been Expired kinldy login again',
          'OK',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
    });
  }

  allPostsData(): void {
    this.isLoading.next(true);
    this.appwriteService.getUserPosts(this.profileUserId).subscribe({
      next: (data) => {
        this.posts = data.documents;
        console.log('All Posts:', this.posts);
        this.isLoading.next(false);
      },
      error: (error) => {
        this.isLoading.next(false);
        console.error('Error:', error);
        const snackBarRef = this.account_snackBar.open(
          'Failed to load posts. Please try again later.',
          'OK',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
        snackBarRef.onAction().subscribe(() => {
          // Handle action if needed
        });
      },
    });
  }

  //   fetchBlogPosts(): void {
  //     this.appwriteService.getBlogPosts().subscribe({
  //       next: (data) => {
  //         this.blogPosts = data.documents;
  //         console.log('All Blog Posts:', this.blogPosts);
  //       },
  //       error: (error) => {
  //         console.error('Error:', error);
  //       },
  //     });
  //   }
  // }

  fetchBlogPosts(): void {
    this.appwriteService.getUserBlogPosts(this.profileUserId).subscribe({
      next: (data) => {
        this.blogPosts = data.documents;
        console.log('User Blog Posts:', this.blogPosts);
      },
      error: (error) => {
        console.error('Error fetching blog posts:', error);
      },
    });
  }
}

// ! note : take {registration} data info to show the 'users since' from the auth api
