import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnSearchGetUserService } from '../../services/appwrite/userdata/on-search-get-user.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  userProfile : any;
  error:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userprofile:OnSearchGetUserService
  ) {}
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const user_tag = params['user_tag'];
        return this.userprofile.getUserProfile(user_tag)
      })
    ).subscribe({
      next: (response) => {
        if (response.documents.length > 0){
          this.userProfile = response.documents[0];
        }else{
          this.error = 'User not found'
          this.router.navigate(['**'])
        }
      },
      error:(error) => {
        this.error = error;
        console.error("getting some errors",error);
      }
    })
  }

}
