import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
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
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserData } from '../interface/user-data';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  // account info
  MonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  Month = this.MonthNames[new Date().getMonth()];
  selectedTabIndex = signal(0);
  posts: RecipePost[] = [];
  blogPosts: BlogPost[] = [];
  userData!: UserData;
  // userData: UserData | null = null;
  // userData: UserData[] = [];
  constructor(private appwriteService: AppwriteService) {}

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

  loggedInUserData() : void {
    this.appwriteService.getCurrentUser().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('User Data:', this.userData);
      },
      error : (error) => {
        console.error("getting error on method loggedInUserData()", error);
      }
    })
  }

  allPostsData(): void {
    this.appwriteService.getUserPosts().subscribe({
      next: (data) => {
        this.posts = data.documents;
        console.log('All Posts:', this.posts);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
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

}

// ! note : take {registration} data info to show the 'users since' from the auth api
