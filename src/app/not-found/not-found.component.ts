import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PexelsService } from '../services/pexels-bg-api/pexels.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})

export class NotFoundComponent implements OnInit {
  backgroundImage: string | null = null;

  constructor(private router: Router, private pexelsService: PexelsService) {}

  ngOnInit(): void {
    this.loadRandomBackgroundImage();
  }

  loadRandomBackgroundImage() {
    this.pexelsService.getRandomFoodImage().subscribe(image => {
      this.backgroundImage = image;
    });
  }

  navigate() {
    const isLoggedIn = !!localStorage.getItem('authToken');
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
