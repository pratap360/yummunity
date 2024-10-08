// ! this side nav bar is depreciated 

import { Component, inject,  ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { AccountComponent } from '../../app/account/account.component';
import { NotificationComponent } from '../../app/notification/notification.component';
import { SearchComponent } from '../../app/search/search.component';
import { RecipePostsComponent } from '../recipe-posts/recipe-posts.component';
import {CommonModule} from '@angular/common';
import { HomeFeedComponent } from '../../app/home-feed/home-feed.component';
@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css',
  imports: [CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    AsyncPipe,
    RouterModule ,
    RouterOutlet,
    RouterLink,
    HomeFeedComponent,
    RecipePostsComponent,
    SearchComponent,
    NotificationComponent,
    AccountComponent,
  ]
})
export class SideNavBarComponent {
  opened: boolean = true;

  toggleSidenav() {
    this.opened = !this.opened;
  }


  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  // ngOnInit() {

  // }

 
}
