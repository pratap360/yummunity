import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnSearchGetUserService } from '../../services/appwrite/userdata/on-search-get-user.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from "../../../components/sidenav/sidenav.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BottomNavComponent } from "../../../components/bottom-nav/bottom-nav.component";
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidenavComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSlideToggleModule,
    BottomNavComponent
],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {

  // userProfile : any;
  // error:any;
  // loading = true;
  // userTag: string = '';
  user: any;
  user_tag: string = '';
  selectedTabIndex = signal(0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userprofile: OnSearchGetUserService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user_tag = params['user_tag'];
      this.fetchUserProfile(this.user_tag);
    });
  }

  fetchUserProfile(user_tag: string): void {
    this.userprofile
      .getUserByTag(user_tag)
      .then((user) => {
        if (user) {
          this.user = user; // Bind user data to the component property
        } else {
          this.router.navigate(['/not-found']);
          setTimeout(() => {
            this.router.navigate(['/home-feed']);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        this.router.navigate(['/not-found']); // Redirect on error
      });
  }


  followUser() {
    alert('following user is working')
    }
}
