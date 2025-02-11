import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
  ],
  templateUrl: './home-feed.component.html',
  styleUrl: './home-feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
  readonly dialog = inject(MatDialog);

  onAddPost(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddPostsComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
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
