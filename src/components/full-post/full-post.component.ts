import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppwriteService } from '../../lib/appwrite.service';

@Component({
  selector: 'app-full-post',
  standalone: true,
  imports: [],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css',
})
export class FullPostComponent implements OnInit {
  postId!: string;
  username!: string;
  postData: any;

  constructor(
    private route: ActivatedRoute,
    private appwriteService: AppwriteService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('postId') || '';
    // this.username = this.route.snapshot.paramMap.get('username') || '';

    // Fetch post data from Appwrite
    this.appwriteService.getPostById(this.postId).subscribe((data) => {
      this.postData = data;
      console.log('FullPostComponent:: ngOnInit() :: postData', this.postData);
    });
  }
}
