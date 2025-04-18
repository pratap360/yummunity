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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  panelOpenState = signal(false);
  isError = false;
  isLoading = true;

  postData: any;
  documentId!: string;
  post_id!: string;
  post!: any;
  fullPost!: RecipePost;

  currentUser: any = {};
  user_tag!: string;
  userId: string = '';
  user!: UserData;
  userData: { user_tag: string } = { user_tag: '' };
  
  newComment: string = '';
  comments: any[] = [];
  comments_counter: number = 0;


  currentImageIndex = 0;
  autoSlideInterval: any;


  @Input() postId: string | null = null;
  private postSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;

    durationInSeconds = 5;
  // private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appwriteService: AppwriteService,
  ) {}

  ngOnInit() {
    this.user_tag = this.route.snapshot.paramMap.get('user_tag') || '';
    this.post_id = this.route.snapshot.paramMap.get('post_id') || '';
  
    // Get current user first
    this.getCurrentUser();
  
    // Then fetch post data
    this.appwriteService.getPostById(this.post_id).subscribe((data) => {
      this.post = data;
      this.isLoading = false;
      // console.log('fetched post data from full post component:', data);
      
      // Process comments if they exist
      if (this.post.post_whoComments) {
        try {
          // Handle both array of objects and array of strings (JSON strings)
          this.comments = this.post.post_whoComments.map((comment: any) => {
            if (typeof comment === 'string') {
              try {
                return JSON.parse(comment);
              } catch (e) {
                console.error('Error parsing comment:', e);
                return null;
              }
            } else {
              return comment; // Already an object
            }
          }).filter((comment: any) => comment !== null);
          
          this.comments_counter = this.comments.length;
          // console.log('Processed comments:', this.comments);
        } catch (e) {
          console.error('Error processing comments:', e);
          this.comments = [];
        }
      } else {
        this.comments = [];
      }

      if (this.post?.post_Content_Pictures?.length > 1) {
        this.startAutoSlide();
      }
    });
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
    this.stopAutoSlide();
    // this.FullpostService.clearCurrentPost();

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

   // Image slider functions
   nextImage(): void {
    if (this.post?.post_Content_Pictures?.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.post.post_Content_Pictures.length;
    }
  }

  prevImage(): void {
    if (this.post?.post_Content_Pictures?.length > 0) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.post.post_Content_Pictures.length - 1 
        : this.currentImageIndex - 1;
    }
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  startAutoSlide(): void {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Reset auto slide timer when manually changing slides
  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
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

  getCurrentUser() {
    if (!this.userId){
      // console.log('User ID received in dialog:', this.userId);
      this.appwriteService.getCurrentUser().subscribe({
        next: (userData) => {
          this.currentUser = userData;
          this.userId = userData.id || userData.user_tag;
          this.userData = {
            user_tag: userData.user_tag || ''
          };
          // console.log('User ID is set in dialog:', this.currentUser ,this.userId);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      })
    }
  }

  postComment() {

    if (!this.newComment.trim()) {
      this._snackBar.open('Please enter a comment', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }

     // Check if user is logged in
  if (!this.currentUser || !this.currentUser.$id) {
    this._snackBar.open('Please log in to comment', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return;
  }
    const newCommentObj = {
      user_id: this.currentUser.$id,
      user_name: this.currentUser.user_name,
      user_tag: this.currentUser.user_tag,
      user_profile_pic: this.currentUser.user_profile_pic,
      comment: this.newComment.trim(),
      date: new Date().toISOString()
    };

    const commentString = JSON.stringify(newCommentObj);
    // console.log('Comment to be added:', commentString);
    
    this.appwriteService.addComment(this.post_id, commentString).subscribe({
      next: (response) => {
        if (!response) {
          throw new Error('Invalid response from server');
        }

        // Update comments locally
        if (response.post_whoComments) {
          this.comments = response.post_whoComments.map((comment: any) => {
            if (typeof comment === 'string') {
              try {
                return JSON.parse(comment);
              } catch (e) {
                console.error('Error parsing comment:', e);
                return null;
              }
            }else {
              return comment;
            }
          }).filter((comment: any) => comment !== null);
        } else {
          // If server doesn't return updated comments, add the new one locally
          this.comments.push(newCommentObj);
        }

        this.comments_counter = this.comments.length;
        this.newComment = '';

        // Show success message
        this._snackBar.open('Comment added successfully!', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        console.error('Error posting comment:', error);
        this._snackBar.open('Failed to add comment', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  sharePost(post:any): void {
    const shareUrl = `${window.location.origin}/user/${post.user_tag}/post/${post.$id}`;
   if(!this.post){
     console.error('Post ID is undefined in TextPostComponent');
     return;
   }

   const dialogRef = this.dialog.open(SharePostComponent, {
     restoreFocus: false,
     width: '500px',
     data: {
       postId: post.$id,
       userTag: post.user_tag,
       shareUrl: shareUrl
     },
   });

   dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
 }

 goToProfile(userTag: string): void {
  // console.log('Navigating to user profile:', userTag);
  this.router.navigate(['/user', userTag]);
 }

}
