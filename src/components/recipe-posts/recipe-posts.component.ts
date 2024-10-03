import { ChangeDetectionStrategy, Component, inject, model,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA,  MatDialog,  MatDialogActions,  MatDialogClose, MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-recipe-posts',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
  ],
  templateUrl: './recipe-posts.component.html',
  styleUrl: './recipe-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipePostsComponent {

    // blog post component 
    blogTitle = 'Summer Chipotle Chicken Cobb Salad with Cilantro Vinaigrette'
    longText = `This juicy salad tastes like summer! With chipotle chicken, sweet corn, avocado, cilantro vinaigrette, bacon crumbles, and fresh strawberries for a pop of sweetness.`;


}
