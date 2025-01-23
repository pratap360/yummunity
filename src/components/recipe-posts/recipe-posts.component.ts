import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { TextPostComponent } from './text-post/text-post.component';
import { WithImgPostComponent } from './with-img-post/with-img-post.component';
import { PostActivityComponent } from "../post-activity/post-activity.component";
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-recipe-posts',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    BlogPostComponent,
    TextPostComponent,
    WithImgPostComponent,
    CommonModule,
    PostActivityComponent
],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})





export class RecipePostsComponent implements OnInit {
  // @Input() post: any;
  // posts: RecipePost[] = [];
  // id: any;

  constructor() {}
  ngOnInit(): void {
    // this.fetchPostsId();
    // this.loadPosts();
  }

  // private loadPosts(){
  //   this.appwriteService.getPostsId().subscribe({
  //     next:(response) => {
  //       this.postsId = response.documents;
  //       console.log('Posts:', this.postsId);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching posts:', error);
  //     }
  //   });
  // }


  //  fetchPostsId(): void {
  //   this.appwriteService.getPostsId().subscribe({
  //     next: (data) => {
  //       console.log('Data:', data);
  //       this.posts = data.documents;
  //       console.log( 'Posts Ids:', this.posts);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching posts:', error);
  //     }
  //   })
  // }
}

//       (data) => {
//         this.posts = data;
//       },
//       (error) => {
//         console.error('Error fetching posts', error);
//       }
//     );
//   }
