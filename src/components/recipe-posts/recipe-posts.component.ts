import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  model,
  OnInit,
  signal,
} from '@angular/core';
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
  ],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePostsComponent implements OnInit {
  @Input() post: any;

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.appwriteService.getPosts().then(
      (response: any) => {
        this.post = response.documents; // Assign fetched posts to the `posts` array
        console.log('Fetched posts:', this.post);
      },
      (error: any) => {
        console.error('Failed to fetch posts:', error);
      }
    );
  }
}
