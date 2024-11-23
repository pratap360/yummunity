import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { PostActivityComponent } from '../../post-activity/post-activity.component';

@Component({
  selector: 'app-text-post',
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
    MatMenuModule,
    PostActivityComponent,
  ],
  templateUrl: './text-post.component.html',
  styleUrl: './text-post.component.css',
})
export class TextPostComponent {
  // comments_counter = 0;

  // constructor(public dialog: MatDialog) {}

  // ngOnInit(): void {
  //   const comments = JSON.parse(localStorage.getItem('comments_1') || '[]');
  //   this.comments_counter = comments.length;
  // }
}
