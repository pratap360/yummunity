import { Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { BlogActivityComponent } from '../../post-activity/blog-activity/blog-activity.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { SharePostComponent } from '../../post-activity/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    BlogActivityComponent
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {

    // blog post component 
    blogTitle = 'Summer Chipotle Chicken Cobb Salad with Cilantro Vinaigrette'
    longText = `This juicy salad tastes like summer! With chipotle chicken, sweet corn, avocado, cilantro vinaigrette, bacon crumbles, and fresh strawberries for a pop of sweetness.`;


    readonly menuTrigger = viewChild.required(MatMenuTrigger);

    readonly dialog = inject(MatDialog);
    sharePost() {
      const dialogRef = this.dialog.open(SharePostComponent, {
        restoreFocus: false,
      });
      dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
    }
}
