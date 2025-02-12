import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css',
})
export class ReadMoreComponent implements OnInit {
  @Input() postId: string | undefined;
  post: any;
  // @Input() userName: string | undefined;
  @Input() documentId!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Received documentId in ReadMoreComponent:', this.documentId);
  }
  // navigateToPost(): void {
  //   const postId = this.generatePostId();
  //   const username = 'user_name';
  //   window.location.href = `/@${username}/post/${postId}`;
  //   window.location.href = `http://localhost:4200/@${username}/post/${postId}`;
  // }

  // generatePostId(): string {
  //   return Math.random().toString(36).substring(2, 12);
  // }

  // goToPost(documentId:string): void {
  //   console.log(documentId);
  //   this.router.navigate(['/post', documentId]);
  // }

  navigateToFullPost() {
    if (this.documentId) {
      console.log('Navigating to full post:', this.documentId);
      this.router.navigate(['/fullpost', this.documentId]); // Ensure routing is configured
    }else{
      console.error('Document ID is not available');
    }
  }

  viewFullPost() {
    this.router.navigate(['/@userId/fullpostID']); // Navigates & updates the URL
  }

}
