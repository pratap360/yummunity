import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PostActivityComponent } from '../../post-activity/post-activity.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { AppwriteService } from '../../../lib/appwrite.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { SharePostComponent } from '../../post-activity/share-post/share-post.component';
import { CommonModule } from '@angular/common';
import { RecipePost } from '../../../app/interface/recipe-post';

@Component({
  selector: 'app-with-img-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatMenuTrigger,
    MatDialogContent,
    MatDialogActions,
    PostActivityComponent,
  ],
  templateUrl: './with-img-post.component.html',
  styleUrl: './with-img-post.component.css',
})
export class WithImgPostComponent {
  // @Input() post: any;
  posts: RecipePost[] = [];

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchAllPosts();
  }


  fetchAllPosts(): void {
    this.appwriteService.getAllPosts().subscribe({
      next: (data) => {
        // console.log('Data:', data);
        this.posts = data.documents;
        console.log( 'All Posts:', this.posts);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    })
  }

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  sharePost() {
    const dialogRef = this.dialog.open(SharePostComponent, {
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}
