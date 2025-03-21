import { AppwriteService } from './../../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
import { Component,Inject, Input   } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RecipePost } from '../../../app/interface/recipe-post';

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
  @Input() postId!: any;
  postData!: RecipePost 
  dateTime: string = new Date().toLocaleString();
  
  commentModalOpen = false;
  

  constructor(
    private  appwriteService: AppwriteService,
  public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.loadComments();
    this.getCurrentUser();
    this.fetchPostData();
  }


  async getCurrentUser() {
    try {
      this.currentUser = await this.appwriteService.getCurrentUser();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }



  async fetchPostData() {
    const postId = this.postId || this.postData?.id;
    if (!postId) {
      console.error('Post ID is undefined', postId);
      return;
    }
    try {
      this.appwriteService.getPostById(postId).subscribe({
        next: (data: RecipePost) => {
          this.postData = data;
          if (this.postData) {
            this.comments = this.postData.post_whoComments || [];
            this.comments.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort desc
          }
        },
        error: (error) => {
          console.error('Error fetching post data:', error);
        }
    });
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }

 async postComment(){
  if (!this.newComment.trim() || !this.currentUser)
    return;

  const newCommentObj = {
    user_id: this.currentUser.$id,
    user_name: this.currentUser.user_name,
    user_tag: this.currentUser.user_tag,
    user_profile_pic: this.currentUser.user_profile_pic,
    date : new Date().toISOString(),
    comment: this.newComment.trim(),
  }

  const postId = this.postId?.id || this.postId || this.postData?.id;

  if (!postId) {
    console.error('Post ID is undefined');
    return;
  }

  try { 
    await this.appwriteService.addCommentToPost(postId, newCommentObj);
    this.comments.unshift(newCommentObj);
    this.newComment = '';
    // this.dialogRef.close(this.comments.length);
    // Update post data after posting
    this.fetchPostData();
  } catch (error) {
    console.error('Error posting comment:', error);
  }

 }


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

  get commentCount(): number {
    return this.comments.length;
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without doing anything
  }

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
