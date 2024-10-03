import { ChangeDetectionStrategy, Component, inject, model,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA,  MatDialog,  MatDialogActions,  MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostsComponent {

}
