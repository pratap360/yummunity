import { FullpostService } from './../../app/services/appwrite/fullpost/fullpost.service';
import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

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
    MatProgressSpinnerModule,
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
export class FullPostComponent implements OnInit, OnDestroy {
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
  // isLoading: boolean = true; // Loading state
  panelOpenState = signal(false);
  newComment: any;

  fullPost!: RecipePost;
  user!: UserData;
  user_tag!: string;
  fullpostId!: string;
  isLoading = true;
  isError = false;
  post: any = null;
  // post: RecipePost | null = null; // To store post data
  @Input() postId: string | null = null;
  private postSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appwriteService: AppwriteService,
    private FullpostService: FullpostService
  ) {}

  // ngOnInit(): void {
  //   const navigationPost = this.FullpostService.getCurrentPost();

  //   if (navigationPost) {
  //     this.post = navigationPost;
  //     return;
  //   }

  //   this.routeSubscription = this.route.paramMap.subscribe((params) => {
  //     const postId = params.get('postId');

  //     if (postId) {
  //       this.fetchPostDetials(postId);
  //     }
  //   });
  // }

  // ngOnInit() {
  //   // Get the post ID from the route parameters
  //   this.postId = this.route.snapshot.paramMap.get('id');

  //   if (!this.postId) {
  //     console.error('Error: Post ID is missing');
  //   } else {
  //     console.log('FullPostComponent loaded with postId:', this.postId);
  //   }
  // }

  ngOnInit() {
    this.post = this.FullpostService.getPost(); // Retrieve post data from service

    if (!this.post) {
      console.error('Error: No post data found!');
    } else {
      console.log('FullPostComponent Loaded with Post:', this.post);
    }
  }

  fetchPostDetials(postId: string) {
    this.appwriteService.getFullPost(postId).subscribe({
      next: (post: RecipePost) => {
        this.post = post;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      },
    });
  }

  ngOnDestroy(): void {
    // this.FullpostService.clearCurrentPost();

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.documentId = params.get('documentId');
  //     console.log('Document ID:', this.documentId); // Debugging

  //     if (this.documentId) {
  //       this.readfullpost();
  //     }
  //   });
  // }
  // ngOnInit() {
  //   this.route.paramMap.subscribe((params) => {
  //     this.user_tag = params.get('user_tag') || '';
  //     this.fullpostId = params.get('fullpostId') || '';

  //     console.log('Getting data in fullpost:', this.user_tag, this.fullpostId);

  //     if (this.fullpostId) {
  //       this.fetchFullPost();
  //     } else {
  //       console.error('Missing post ID parameter');
  //       this.isError = true;
  //       this.isLoading = false;
  //     }
  //   });
  // }

  fetchFullPost() {
    this.appwriteService.getFullPost(this.fullpostId).subscribe({
      next: (post: RecipePost) => {
        this.fullPost = post;
        this.isLoading = false;
        console.log('fetched post data:', post);
        if (post.user_name) {
          this.user.user_name = post.user_name;
        }

        if (post.user_bio) {
          this.user.user_bio = post.user_bio;
        }

        // Set the user_tag from the route parameter
        this.user.user_tag = this.user_tag;
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
