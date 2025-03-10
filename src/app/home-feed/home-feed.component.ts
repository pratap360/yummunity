import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RecipePostsComponent } from '../../components/recipe-posts/recipe-posts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AddPostsComponent } from '../../components/add-posts/add-posts.component';
import { PostContainerComponent } from '../../components/post-container/post-container.component';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { FullPostComponent } from '../../components/full-post/full-post.component';
import { UserData } from '../interface/user-data';
import { AppwriteService } from '../../lib/appwrite.service';

@Component({
  selector: 'app-home-feed',
  standalone: true,
  imports: [
    MatCardModule,
    // SideNavBarComponent,
    SidenavComponent,
    RecipePostsComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule,
    PostContainerComponent,
    BottomNavComponent,
    FullPostComponent,
  ],
  templateUrl: './home-feed.component.html',
  styleUrl: './home-feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent implements OnInit {
  userData!: UserData;

  readonly dialog = inject(MatDialog);

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.appwriteService.getCurrentUser().subscribe({
      next: (data: UserData) => {
        this.userData = data;
        console.log('User data:', this.userData);
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      },
    });
  }
  onAddPost(
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

  // openDialog() {
  //   const dialogRef = this.dialog.open(AddPostsComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  // closeDialog() {
  //   const dialogRef = this.dialog.closeAll();
  //   console.log(dialogRef);

  // }
}
