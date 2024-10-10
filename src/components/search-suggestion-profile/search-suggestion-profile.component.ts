import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule,RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-suggestion-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    RouterOutlet, 
    RouterLink
  ],
  templateUrl: './search-suggestion-profile.component.html',
  styleUrl: './search-suggestion-profile.component.css'
})
export class SearchSuggestionProfileComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getsuggestUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}
