import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.css'
})
export class PostContainerComponent {

}
