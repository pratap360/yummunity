import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [   
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent {
  likes = 0;
  liked = false;

  toggleLike(): void {
    this.liked = !this.liked;
    this.likes = this.liked ? this.likes + 1 : this.likes - 1;
  }

}
