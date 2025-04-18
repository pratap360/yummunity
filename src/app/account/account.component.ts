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
import { AddPostsComponent } from '../../components/add-posts/add-posts.component';
import { MatDialog } from '@angular/material/dialog';
import { TextPostComponent } from './components/text-post/text-post.component';
import { WithImgPostComponent } from './components/with-img-post/with-img-post.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

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

  profileUserTag: string = '';
  isLoading = new BehaviorSubject<boolean>(false);
  limit = 5;

  durationInSeconds = 5;
  private router = inject(Router);
  private account_snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  textPosts: any[] = [];
  withImgPosts: any[] = [];

  savedPost: any[] = [];
  savedBlogPost: any[] = [];

  readonly dialog = inject(MatDialog);
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
        // console.log('User Data:', this.userData);
        this.profileUserTag = this.userData.user_tag;
        // console.log('Profile User ID:', this.profileUserTag);
        this.allPostsData();
        // this.fetchBlogPosts();
        // this.getSavedPosts();
        // this.getSaveBlogPosts();
        this.isLoading.next(false);
      },
      error: (error) => {
        this.isLoading.next(false);
        console.error('getting error on method loggedInUserData()', error);
        this.account_snackBar
          .open('Your Session has been Expired kinldy login again', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          })
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      },
    });
  }


  onTabChange(tabIndex: number): void {
    if(tabIndex === 1){
      this.fetchBlogPosts();
    }
    if (tabIndex === 2) {
      this.getSavedPosts();
      this.getSaveBlogPosts();
    }
  }

  allPostsData(): void {
    this.isLoading.next(true);
    this.appwriteService.getUserPosts(this.profileUserTag).subscribe({
      next: (data) => {
        this.posts = data.documents;
        // console.log('All Posts:', this.posts);
        this.isLoading.next(false);

        this.textPosts = (this.posts || []).filter(
          (post) => !post.post_Content_Pictures
        );
        this.withImgPosts = (this.posts || []).filter(
          (post) => post.post_Content_Pictures
        );
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

  fetchBlogPosts(): void {
    this.appwriteService.getUserBlogPosts(this.profileUserTag).subscribe({
      next: (data) => {
        this.blogPosts = data.documents;
        // console.log('User Blog Posts:', this.blogPosts);
      },
      error: (error) => {
        console.error('Error fetching blog posts:', error);
        this.account_snackBar.open(
          'Failed to load posts. Please try again later.',
          'OK',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
      },
    });
  }

  // ** working good method to get saved posts
  // getSavedPosts(): void {
  //   this.isLoading.next(true);
  //   this.appwriteService.getUserSavedPosts(this.profileUserTag).subscribe({
  //     next: (data) => {
  //       console.log('Raw data from getUserSavedPosts:', data); // Log the full data object
  //       this.savedPost = data.documents || []; // Add fallback to empty array
  //       console.log('Saved Posts:', this.savedPost);
  //       this.isLoading.next(false);
  //     },
  //     error: (error) => {
  //       this.isLoading.next(false);
  //       console.error('Error fetching saved posts:', error);
  //       this.account_snackBar.open(
  //         'Failed to load saved posts. Please try again later.',
  //         'OK',
  //         {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: this.durationInSeconds * 1000,
  //         }
  //       );
  //     },
  //   });
  // }

  getSavedPosts(): void {
    // this.isLoading.next(true);
    this.appwriteService.getUserSavedPosts(this.profileUserTag).subscribe({
      next: (data) => {
        // console.log('Raw data from getUserSavedPosts:', data); // Log the full data object

        // Ensure 'data.documents' is an array, or default to an empty array
        this.savedPost = (data.documents || []).map((post) => ({
          ...post,
          // Use the original author data from the nested users property
          user_name: post.users?.user_name || post.user_name,
          user_tag: post.users?.user_tag || post.user_tag,
          user_profile_pic:
            post.users?.user_profile_pic || post.user_profile_pic,
          // Keep additional user properties if needed
          user_bio: post.users?.user_bio || post.user_bio,
        }));

        // console.log('Mapped Saved Posts:', this.savedPost); // Log the mapped data
        this.isLoading.next(false);
      },
      error: (error) => {
        this.isLoading.next(false);
        console.error('Error fetching saved posts:', error);
        this.account_snackBar.open(
          'Failed to load saved posts. Please try again later.',
          'OK',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
      },
    });
  }

  getSaveBlogPosts(): void {
    // this.isLoading.next(true);
    this.appwriteService.getUserBlogSavedPosts(this.profileUserTag).subscribe({
      next: (data) => {
        // console.log('Raw data from getSaveBlogPosts:', data); // Log the full data
        // Map blog posts to preserve author data
        this.savedBlogPost = (data.documents || []).map((post) => ({
          ...post,
          // Use author data from nested users object if available
          user_name: post.users?.user_name || post.user_name,
          user_tag: post.users?.user_tag || post.user_tag,
          user_profile_pic:
            post.users?.user_profile_pic || post.user_profile_pic,
          user_bio: post.users?.user_bio || post.user_bio,
        }));
        // this.savedBlogPost = data.documents || []; // Add fallback to empty array
        // console.log('Saved Blog Posts:', this.savedBlogPost);
        this.isLoading.next(false);
      },
      error: (error) => {
        this.isLoading.next(false);
        console.error('Error fetching saved posts:', error);
        this.account_snackBar.open(
          'Failed to load saved posts. Please try again later.',
          'OK',
          {}
        );
      },
    });
  }

  AddPostfromAcc(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddPostsComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { userData: this.userData },
    });
  }
}

// ! note : take {registration} data info to show the 'users since' from the auth api
