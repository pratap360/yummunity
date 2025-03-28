import { Component, inject, Input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlogActivityComponent } from '../../../../components/blog-activity/blog-activity.component';
import { SharePostComponent } from '../../../../components/post-activity/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '../../../interface/blog-post';
import { CommonModule } from '@angular/common';
import { UserData } from '../../../interface/user-data';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    BlogActivityComponent,
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css',
})
export class BlogPostComponent {
  @Input() blogPosts: BlogPost[] = [];
  @Input() userData: any;
  @Input() alluserData: { [postId: string]: UserData } = {};

  //   constructor(private appwriteService: AppwriteService){}

  //   ngOnInit(): void {
  //     this.fetchBlogPosts();
  //   }

  // fetchBlogPosts(): void {
  //   this.appwriteService.getBlogPosts().subscribe({
  //     next:(data) => {
  //       this.blogPosts = data.documents;
  //       console.log('All Blog Posts:', this.blogPosts);
  //     },
  //     error:(error) => {
  //       console.error('Error:', error);
  //     }
  //   })
  // }

  // blog post component
  // blogTitle = 'Summer Chipotle Chicken Cobb Salad with Cilantro Vinaigrette';
  // longText = `This juicy salad tastes like summer! With chipotle chicken, sweet corn, avocado, cilantro vinaigrette, bacon crumbles, and fresh strawberries for a pop of sweetness.`;

  readonly menuTrigger = viewChild.required(MatMenuTrigger);
  readonly dialog = inject(MatDialog);
  sharePost() {
    const dialogRef = this.dialog.open(SharePostComponent, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}
