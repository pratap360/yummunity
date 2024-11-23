import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {

    // blog post component 
    blogTitle = 'Summer Chipotle Chicken Cobb Salad with Cilantro Vinaigrette'
    longText = `This juicy salad tastes like summer! With chipotle chicken, sweet corn, avocado, cilantro vinaigrette, bacon crumbles, and fresh strawberries for a pop of sweetness.`;

}
