import { Component,Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PostActivityComponent } from '../../post-activity/post-activity.component';
import {MatMenuModule} from '@angular/material/menu';
import { AppwriteService } from '../../../lib/appwrite.service';

@Component({
  selector: 'app-with-img-post',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    PostActivityComponent
  ],
  templateUrl: './with-img-post.component.html',
  styleUrl: './with-img-post.component.css'
})
export class WithImgPostComponent implements OnInit {
  @Input() post: any;

  constructor(private appwriteService: AppwriteService) {}
  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.appwriteService.getPosts().subscribe(
      (response: any) => {
        this.post = response.documents; // Assign fetched posts to the `posts` array
        console.log('Fetched posts:', this.post);
      },
      (error: any) => {
        console.error('Failed to fetch posts:', error);
      }
    );
  }


}
