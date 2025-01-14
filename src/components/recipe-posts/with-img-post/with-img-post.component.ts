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

@Component({
  selector: 'app-with-img-post',
  standalone: true,
  imports: [
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
export class WithImgPostComponent implements OnInit {
  @Input() post: any;

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.appwriteService.getPosts().subscribe(
      (response: any) => {
        this.post = response.documents; // Assign fetched posts to the `posts` array
        console.log('Fetched posts:', this.post);
      },
      (error: any) => {
        console.error('Failed to fetch posts:', error);
      }
    );
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
