import { AppwriteService } from './../../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
import { Component,EventEmitter,inject,Inject, Input, Output   } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
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
  styleUrl: './comments.component.css'
})
export class CommentsComponent  {
  newComment:string = '';
  comments: any[] = []; // Hold the list of comments
  currentUser: any = {}
  blogpostId!: string;
  userId: string = '';
  
  blogPost!: any;
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
    @Inject(MAT_DIALOG_DATA) public data: { blogpostId?: string }
  ) {}

  ngOnInit(): void {
    this.blogpostId = this.data.blogpostId || '';
    console.log('Blog Post ID:', this.blogpostId);

    if (!this.blogpostId) {
      console.error('Post is undefined in Blog Activity Component');
    }else{
      this.getCurrentUser();
      this.fetchBlogPostData();
    }

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

  fetchBlogPostData() {
    this.appwriteService.getBlogPostById(this.blogpostId).subscribe({
      next: (data) => {
        if(data.blog_post_whoComments){
          this.comments = data.blog_post_whoComments.map((comment: any) => {
            if(typeof comment === 'string'){
              try {
                return JSON.parse(comment);
              } catch (error) {
                return comment;
              }
            }
            return comment;
          })
        }else {
          this.comments = [];
        }

        this.comments_counter = this.comments.length;
        this.comments.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      },
      error: (error) => {
        console.error('Error fetching blog post data:', error);
      }
  })
}
  

  BlogpostComment(){
    if (!this.newComment.trim() || !this.userId) {
      this._snackBar.open('Please enter a comment', 'OK', {
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
    console.log('Comment to be added:', commentString);

    this.appwriteService.addBlogComment(this.blogpostId,commentString).subscribe({
      next: (response) => {
        if (!response || !response.blog_post_whoComments) {
          throw new Error('Invalid response from server');
        }
        // Update comments locally
        this.comments = response.blog_post_whoComments || [];
        this.comments_counter = this.comments.length;
        // Reset new comment input
        this.newComment = '';
        this.commentAdded.emit(this.comments_counter);
        this._snackBar.open('Comment added successfully', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

        this.dialogRef.close(this.comments_counter);
      },
      error: (error) => {
        console.error('Error posting comment:', error);
        this._snackBar.open('Failed to add comment', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })

  }

  get commentCount(): number {
    return this.comments.length;
  }

  onCancel(): void {
    this.dialogRef.close(this.comments_counter); // Close without doing anything
  }

}