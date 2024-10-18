import { ChangeDetectionStrategy, Component, inject, model,OnInit,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA,  MatDialog,  MatDialogActions,  MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostsComponent implements OnInit {
  canPost: boolean = true;

  users: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsersdata().subscribe({
      next: (response) => {
        this.users = response.data.data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}
