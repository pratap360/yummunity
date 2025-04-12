import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
// import { SideNavBarComponent } from '../../components/side-nav-bar/side-nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { AccountComponent } from '../account/account.component';
import { SearchComponent } from '../search/search.component';
import { HomeFeedComponent } from '../home-feed/home-feed.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostContainerComponent } from "../../components/post-container/post-container.component";
import { BottomNavComponent } from "../../components/bottom-nav/bottom-nav.component";
import { NotificationService } from '../services/appwrite/notification.service';
import { CommonModule,DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatCardModule,
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    SearchComponent,
    HomeFeedComponent,
    AccountComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTooltipModule, 
    PostContainerComponent, 
    BottomNavComponent,
    CommonModule,
    DatePipe,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit{
  
hideMultipleSelectionIndicator = signal(true);
hideSingleSelectionIndicator = signal(false);
  
notifications : any [] = []
notification: any;
notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.notificationService.initNotifications();
    console.log('Notifications:', this.notificationService.notifications());
    // const postUrl = `/user/${this.notification.user.user_tag}/post/${this.notification.post.postId}`;

  }

  getRelativeTime(dateStr: string): string {
    const now = new Date();
    const actionTime = new Date(dateStr); // this must be from DB, not new Date()
    const diff = Math.floor((now.getTime() - actionTime.getTime()) / 1000);
  
    if (diff < 60) return `${diff}s ago`;
    else if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    else if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    else return `${Math.floor(diff / 86400)}d ago`;
  }
  
  postUrl() {
    return `/user/${this.notification.user.user_tag}/post/${this.notification.post.postId}`;
  }

  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'liked': 'favorite',
      'saved': 'bookmark_added',
      'commented': 'comment',
      'default': 'notifications'
    };
    
    return iconMap[type] || iconMap['default'];
  }

  markAsRead():void {
    this.notificationService.markAllRead();
  }

}
