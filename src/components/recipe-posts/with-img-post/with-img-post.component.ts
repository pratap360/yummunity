import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PostActivityComponent } from '../../post-activity/post-activity.component';
import {MatMenuModule} from '@angular/material/menu';

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
export class WithImgPostComponent {

}
