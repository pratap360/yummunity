import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import { BlogPostComponent } from "../../components/recipe-posts/blog-post/blog-post.component";
import { TextPostComponent } from "../../components/recipe-posts/text-post/text-post.component";
import { WithImgPostComponent } from "../../components/recipe-posts/with-img-post/with-img-post.component";
import { PostContainerComponent } from "../../components/post-container/post-container.component";
import { PostActivityComponent } from "../../components/post-activity/post-activity.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component";
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    // SideNavBarComponent,
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
    BlogPostComponent,
    TextPostComponent, WithImgPostComponent,
    PostContainerComponent,
    PostActivityComponent,
    BottomNavComponent
],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  // account info 
  MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  Month = this.MonthNames[new Date().getMonth()];


  // blog post component 
  blogTitle = 'Summer Chipotle Chicken Cobb Salad with Cilantro Vinaigrette'
  longText = `This juicy salad tastes like summer! With chipotle chicken, sweet corn, avocado, cilantro vinaigrette, bacon crumbles, and fresh strawberries for a pop of sweetness.`;


  name = 'Pratap Parui';
  username = '@pratap360';
  description = 'Developer | Food Lover & Critics';
  // profileImage = 'assets/path-to-profile-image.jpg';

  recipesCount = 10;
  followersCount = 349;
  yummunityRating = 4.5;

  link = 'Parui Dev';
  linkUrl = 'https://paruidev.com';
}


// ! note : take {registration} data info to show the 'users since' from the auth api 
