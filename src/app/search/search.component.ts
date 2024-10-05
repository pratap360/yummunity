import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { SideNavBarComponent } from '../../components/side-nav-bar/side-nav-bar.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { AccountComponent } from '../account/account.component';
import { NotificationComponent } from '../notification/notification.component';
import { HomeFeedComponent } from '../home-feed/home-feed.component';
import { RouterModule,RouterOutlet, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {DatePipe} from '@angular/common';
import { SearchSuggestionProfileComponent } from '../../components/search-suggestion-profile/search-suggestion-profile.component';
import { TrendingRecipesListComponent } from "../../components/trending-recipes-list/trending-recipes-list.component";
import { PostContainerComponent } from "../../components/post-container/post-container.component";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    HomeFeedComponent,
    NotificationComponent,
    AccountComponent,
    SearchSuggestionProfileComponent,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    DatePipe,
    RouterModule,
    RouterOutlet,
    RouterLink,
    TrendingRecipesListComponent,
    PostContainerComponent
],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {




  // users = [
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' },
  //   { name: 'User_name', id: 'user_id', bio: 'user’s bio' }
  // ];
}
