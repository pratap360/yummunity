import { Component,HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
// import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent implements OnInit {

  isMobile = false;

  constructor() { }
  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
  }

  logout() {
    // this.Sidenav.logout();
    console.log('logout works');
    
  }

}
