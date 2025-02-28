import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppwriteService } from '../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PostActivityComponent } from '../post-activity/post-activity.component';
import { SharePostComponent } from '../post-activity/share-post/share-post.component';
import { LikesComponent } from '../post-activity/likes/likes.component';
import { SavesComponent } from '../post-activity/saves/saves.component';
import { CommentsComponent } from '../post-activity/comments/comments.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { PostContainerComponent } from '../post-container/post-container.component';
import { MarkdownModule } from 'ngx-markdown';
import { RecipePost } from '../../app/interface/recipe-post';
import { UserData } from '../../app/interface/user-data';

@Component({
  selector: 'app-full-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    LikesComponent,
    SavesComponent,
    MatExpansionModule,
    BottomNavComponent,
    SidenavComponent,
    PostContainerComponent,
    MarkdownModule,
  ],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css',
})
export class FullPostComponent implements OnInit {
  onCancel() {
    throw new Error('Method not implemented.');
  }
  postComment() {
    throw new Error('Method not implemented.');
  }

  comments_counter = 0;
  // postId!: string;
  // username!: string;
  user_name: string = 'Pratap Parui';
  user_bio: string = 'Developer|Food Critics';

  postData: any;
  documentId!: string;
  post: any = null; // To store post data
  // isLoading: boolean = true; // Loading state
  panelOpenState = signal(false);
  newComment: any;

  fullPost!: RecipePost;
  user!: UserData;
  user_tag!: string;
  fullpostId!: string;
  isLoading = true;
  isError = false;
  constructor(
    private route: ActivatedRoute,
    private appwriteService: AppwriteService
  ) {}

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.documentId = params.get('documentId');
  //     console.log('Document ID:', this.documentId); // Debugging

  //     if (this.documentId) {
  //       this.readfullpost();
  //     }
  //   });
  // }
  ngOnInit() {
    this.user_tag = this.route.snapshot.paramMap.get('user_tag')!;
    this.fullpostId = this.route.snapshot.paramMap.get('fullpostId')!;
    console.log(
      'getting all data in fullpost:',
      this.user_tag,
      this.fullpostId
    );
    this.fetchFullPost();
    // if (this.documentId) {
    //   this.readfullpost();
    // }
  }

  fetchFullPost() {
    this.appwriteService.getFullPost(this.fullpostId).subscribe({
      next: (post: RecipePost) => {
        this.fullPost = post;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.isError = true;
        this.isLoading = false;
      },
    });
  }
  readfullpost(): void {
    this.appwriteService.getPostById(this.documentId).subscribe({
      next: (data) => {
        this.post = data;
        // this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        // this.isLoading = false;
      },
    });
  }

  goBack(): void {
    window.history.back();
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
