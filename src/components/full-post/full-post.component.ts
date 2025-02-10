import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppwriteService } from '../../lib/appwrite.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-full-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css',
})
export class FullPostComponent implements OnInit {
  // postId!: string;
  // username!: string;
  // postData: any;
  documentId: string | null = null;
  post: any = null; // To store post data
  isLoading: boolean = true; // Loading state

  constructor(
    private route: ActivatedRoute,
    private appwriteService: AppwriteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentId = params.get('documentId');
      console.log('Document ID:', this.documentId); // Debugging

      if (this.documentId) {
        this.readfullpost();
      }
    });
  }

  readfullpost(): void {
    this.appwriteService.getPostById(this.documentId!).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching post:', error);
        this.isLoading = false;
      },
    });
  }
}
