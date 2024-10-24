import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.css'
})
export class ReadMoreComponent {
  navigateToPost(): void {
    const postId = this.generatePostId();
    const username = 'user_name';
    window.location.href = `/@${username}/post/${postId}`;
    // window.location.href = `http://localhost:4200/@${username}/post/${postId}`;
  }

  generatePostId(): string {
    return Math.random().toString(36).substring(2, 12);
  }
}
