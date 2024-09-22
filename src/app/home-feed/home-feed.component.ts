import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// import { SideNavBarComponent } from '../../components/side-nav-bar/side-nav-bar.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { SearchComponent } from '../search/search.component';

import { NotificationComponent } from '../notification/notification.component';
import { AccountComponent } from '../account/account.component';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home-feed',
  standalone: true,
  imports: [
    MatCardModule,
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    SearchComponent,
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
  templateUrl: './home-feed.component.html',
  styleUrl: './home-feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
  readonly dialog = inject(MatDialog);




  onAddPost(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RecipePostsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
