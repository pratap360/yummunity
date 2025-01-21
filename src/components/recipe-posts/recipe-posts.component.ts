import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { TextPostComponent } from './text-post/text-post.component';
import { WithImgPostComponent } from './with-img-post/with-img-post.component';
import { AppwriteService } from '../../lib/appwrite.service';

@Component({
  selector: 'app-recipe-posts',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    BlogPostComponent,
    TextPostComponent,
    WithImgPostComponent,
    CommonModule,
  ],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePostsComponent implements OnInit {
  // @Input() post: any;
  postsId: string[] = [];
  id: any;

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchPostsId();
  }

  fetchPostsId(): void {
    this.appwriteService.getPostsId().subscribe({
      next: (data) => {
        this.postsId = data;
        console.log( 'Posts Ids:', this.postsId);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
}

//       (data) => {
//         this.posts = data;
//       },
//       (error) => {
//         console.error('Error fetching posts', error);
//       }
//     );
//   }
