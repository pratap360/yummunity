import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnSearchGetUserService } from '../../services/appwrite/userdata/on-search-get-user.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BottomNavComponent } from '../../../components/bottom-nav/bottom-nav.component';
import { BlogPost } from '../../interface/blog-post';
import { RecipePost } from '../../interface/recipe-post';
import { TextPostComponent } from '../../../components/recipe-posts/text-post/text-post.component';
import { WithImgPostComponent } from '../../../components/recipe-posts/with-img-post/with-img-post.component';
import { BlogPostComponent } from '../../../components/recipe-posts/blog-post/blog-post.component';
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
    BottomNavComponent,
    TextPostComponent,
    WithImgPostComponent,
    BlogPostComponent,
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
  user_name: string = '';
  selectedTabIndex = signal(0);
  posts: RecipePost[] = [];
  blogPosts: BlogPost[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userprofile: OnSearchGetUserService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user_tag = params['user_tag'];
      this.user_name = params['user_name'];
      this.fetchUserProfile(this.user_tag);
      this.fetchUserPosts(this.user_name);
    });
  }

  fetchUserProfile(user_tag: string): void {
    console.log('this is what user tag i need', user_tag);
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

  fetchUserPosts(user_name: string): void {
    console.log('this is what user name i need', user_name);
    this.userprofile
      .getPostsByUserName(user_name)
      .then((posts) => {
        if (posts) {
          this.posts = posts;
        }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }

  followUser() {
    alert('following user is working');
  }
}
