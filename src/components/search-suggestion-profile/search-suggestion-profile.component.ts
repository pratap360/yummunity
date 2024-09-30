import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule,RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-search-suggestion-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet, 
    RouterLink
  ],
  templateUrl: './search-suggestion-profile.component.html',
  styleUrl: './search-suggestion-profile.component.css'
})
export class SearchSuggestionProfileComponent {

}
