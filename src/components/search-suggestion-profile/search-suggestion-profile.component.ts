import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule,RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../app/services/users/users.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { OnSearchGetUserService } from '../../app/services/appwrite/userdata/on-search-get-user.service';
import { UserData } from '../../app/interface/user-data';
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
    MatGridListModule,
    RouterLink
  ],
  templateUrl: './search-suggestion-profile.component.html',
  styleUrl: './search-suggestion-profile.component.css'
})
export class SearchSuggestionProfileComponent implements OnInit {

  users: any[] = [];
  // users: UserData[] = [];

  // constructor(private userService: UsersService) { }
  constructor(private OnSearchUsers: OnSearchGetUserService) { }

  // ngOnInit(): void {
  //   this.userService.getsuggestUsers().subscribe({
  //     next: (response) => {
  //       this.users = response.data.data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.OnSearchUsers.getUsersOnSearch().subscribe({
      next:(response ) => {
        this.users = response.documents;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    })
  }

}
