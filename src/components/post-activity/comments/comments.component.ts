import { UserData } from './../../../app/interface/user-data';
import { AppwriteService } from './../../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RecipePost } from '../../../app/interface/recipe-post';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
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
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  newComment: string = '';
  comments: any[] = []; // Hold the list of comments
  currentUser: any = {};
  // @Input() postId!: any;
  postId!: string;
  userId: string = '';
  // userData: { user_tag: string } = { user_tag: '' };
  postData!: RecipePost;
  dateTime: string = new Date().toLocaleString();
  @Output() commentAdded = new EventEmitter<number>();
  commentModalOpen = false;
  comments_counter: number = 0;
  
  durationInSeconds = 5;
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialog: MatDialog,
    private appwriteService: AppwriteService,
    public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId?: string; userId?: string; }
  ) // @Inject(MAT_DIALOG_DATA) public data: { postId?: string, post?: RecipePost,comments_counter: number }
  {
    // this.postId = data.postId;
    // this.postData = data.postData;
    // this.comments_counter = data.comments_counter || 0;
  }

  ngOnInit(): void {
    this.postId = this.data.postId || '';
    console.log('Post ID received in dialog:', this.postId);

    if (this.postId) {
      this.getCurrentUser();
      this.fetchPostData();
    } else {
      console.error('Post ID is undefined in CommentsComponent');
    }

    // this.loadComments();
    // this.getCurrentUser();
    // if (!this.postId) {
    //   console.error('Post ID is undefined');
    // } else {
    //   this.fetchPostData();
    // }
  }

   getCurrentUser() {
    if (!this.userId){
      // console.log('User ID received in dialog:', this.userId);
      this.appwriteService.getCurrentUser().subscribe({
        next: (userData) => {
          this.currentUser = userData;
          this.userId = userData.user_tag;
          console.log('User ID is set in dialog:', this.currentUser ,this.userId);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      })
    }
  }

  async fetchPostData() {
    const postId = this.data.postId;
    if (!postId) {
      console.error('Post ID is undefined', postId);
      return;
    }
    try {
      this.appwriteService.getPostById(postId).subscribe({
        next: (data: RecipePost) => {
          this.postData = data;
          if (this.postData) {
            this.comments = Array.isArray(this.postData.post_whoComments) 
            ? this.postData.post_whoComments 
            : [];
            this.comments_counter = this.comments.length;
            this.comments.sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ); // Sort desc
          }
        },
        error: (error) => {
          console.error('Error fetching post data:', error);
        },
      });
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }

  // async postComment() {
  //   if (!this.newComment.trim() || !this.userId) {
  //     // console.error('Comment is empty', this.newComment);
  //     alert('Please enter any comment');
  //     return;
  //   }

  //   const postId = this.data.postId;
  //   if (!postId) {
  //     console.error('Post ID is undefined when posting comment');
  //     return;
  //   }

  //   const newCommentObj = {
  //     user_id: this.currentUser.$id,
  //     user_name: this.currentUser.user_name,
  //     user_tag: this.currentUser.user_tag,
  //     user_profile_pic: this.currentUser.user_profile_pic,
  //     date: new Date().toISOString(),
  //     comment: this.newComment.trim(),
  //   };

  //   // if (this.newComment.trim()) {
  //   //   this.comments.push(newCommentObj);
  //   //   this.newComment = '';
  //   //   this.comments_counter++;
  //   //   this.commentAdded.emit(this.comments.length);
  //   // }
  //   try {
  //     const updatedComments = [newCommentObj, ...this.comments];
  //     await this.appwriteService.addCommentToPost(postId, updatedComments);
  //     this.comments = updatedComments;
  //     this.newComment = '';
  //     this.comments_counter = this.comments.length;
  //     this.commentAdded.emit(this.comments_counter);
      
  //     this._snackBar.open('Comment added successfully!!', 'OK', {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: this.durationInSeconds * 1000,
  //     });
  //     this.dialogRef.close(this.comments_counter);
  //     // this.fetchPostData();
  //   } catch (error) {
  //     console.error('Error posting comment:', error);
  //     this._snackBar.open('Removed from your profile !!', 'OK', {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: this.durationInSeconds * 1000,
  //     });
  //   }
  // }

  // loadComments():void{
  //   const storedComments = localStorage.getItem(`comments_${this.data.postId}`);
  //   this.comments = storedComments ? JSON.parse(storedComments) : [];
  // }

  // onPostComment(): void {
  //   if (this.newComment.trim()) {
  //         this.comments++;
  //         this.newComment = '';
  //         this.dialogRef.close(this.newComment);
  //       }
  // }

  //   closeCommentModal(): void {
  //   this.commentModalOpen = false;
  // }

  // postComment(): void {
  //   if (this.newComment.trim()) {
  //     // this.comments++;
  //     this.comments.push(this.newComment);
  //     this.newComment = '';
  //     // this.dialogRef.close(this.comments);
  //     // this.closeCommentModal();

  //     localStorage.setItem(`comments_${this.data.postId}`, JSON.stringify(this.comments));
  //     console.log(this.comments);

  //     this.dialogRef.close(this.comments.length);
  //   }
  // }

  postComment() {
    const postId = this.data.postId;
    if (!postId) {
      console.error('Post ID is undefined when posting comment');
      return;
    }

    if (!this.newComment.trim() || !this.userId) {
      alert('Please enter any comment');
      return;
    }

    const newCommentObj = {
      user_id: this.currentUser.$id,
      user_name: this.currentUser.user_name,
      user_tag: this.currentUser.user_tag,
      user_profile_pic: this.currentUser.user_profile_pic,
      date: new Date().toISOString(),
      comment: this.newComment.trim(),
    };
  
      // Create an updated comments array
      // const updatedComments = [newCommentObj, ...this.comments];
      
      // Use the Observable-based method from the service
      this.appwriteService.addComment(postId, newCommentObj).subscribe({
        next: (response) => {

          if (response || response.post_whoComments) {
            this.comments = response.post_whoComments || [];
            this.comments_counter = this.comments.length;
            this.commentAdded.emit(this.comments_counter);
            console.log('Comments after adding LINE 255:', this.comments);
          }else{
            console.error('No comments found in response:', response);
            console.log('Comments after adding LINE 258:', this.comments);
          }

          // this.comments.unshift(updatedComments);
          // this.newComment = '';
          // this.comments_counter = this.comments.length;
          // this.commentAdded.emit(this.comments_counter);
          this.newComment = '';
          this._snackBar.open('Comment added successfully!!', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
          this.dialogRef.close(this.comments_counter);
        },
        error: (error) => {
          console.error('Error posting comment:', error);
          this._snackBar.open('Failed to add comment', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        }
      });
  }
  onCancel(): void {
    this.dialogRef.close(this.comments_counter); // Close without doing anything
  }

  get commentCount(): number {
    return this.comments.length;
  }

  // openCommentModal(): void {
  //   if (!this.postData) {
  //     console.error('No post available to open comment modal');
  //     return;
  //   }

  //   const dialogRef = this.dialog.open(CommentsComponent, {
  //     width: '500px',
  //     data: {
  //       postId: this.postData.id,
  //       post: this.postData,
  //       comments_counter: this.comments_counter,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((updatedCount) => {
  //     if (updatedCount !== undefined) {
  //       this.comments_counter = updatedCount; // Update count after modal is closed
  //     }
  //   });
  // }
  // closeCommentModal(): void {
  //   this.commentModalOpen = false;
  // }
  // postComment(): void {
  //   if (this.newComment.trim()) {
  //     this.comments++;
  //     this.newComment = '';
  //     this.closeCommentModal();
  //   }
  // }
}
