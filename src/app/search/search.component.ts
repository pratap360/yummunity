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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule,
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    HomeFeedComponent,
    NotificationComponent,
    AccountComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {

}
