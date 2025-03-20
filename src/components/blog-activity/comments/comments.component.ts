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
  commentModalOpen = false;

  comments: any[] = []; // Hold the list of comments
  currentUser: any = {}
  @Input() blogPost!: any;
  dateTime: string = new Date().toLocaleString();
  

  constructor(
  private AppwriteService: AppwriteService,
  public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    // this.loadComments();
    // this.fetchComments();
  }

  async getCurrentUser() {
    try {
      this.currentUser = await this.AppwriteService.getCurrentUser()
      console.log(this.currentUser);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  // async fetchComments() {
  //   try {
  //     const postData = await this.AppwriteService.getPostById(this.post.id!);
  //     this.comments = postData?.post_whoComments || [];
  //   } catch (error) {
      
  //   }
  // }

  BlogpostComment(): void {
    if (this.newComment.trim()) {
      // this.comments++;
      this.comments.push(this.newComment);
      this.newComment = '';
      // this.dialogRef.close(this.comments); 
      // this.closeCommentModal();

      localStorage.setItem(`comments_${this.data.postId}`, JSON.stringify(this.comments));
      console.log(this.comments);
      
      this.dialogRef.close(this.comments.length);
    }
  }

  get commentCount(): number {
    return this.comments.length;
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without doing anything
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
