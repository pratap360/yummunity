import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Client, Account } from 'appwrite';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    AsyncPipe,
    RouterModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  // opened: boolean = true;
  isCollapsed = false;
  client = new Client();
  account: any;

  toggleSidenav() {
    // this.opened = !this.opened;
    this.isCollapsed = !this.isCollapsed;
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {
    this.client.setProject('670194640036c325ba3a');
    this.account = new Account(this.client);
  }

  async logout() {
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log("Appwrite Service :: logout()", error);
    }
  }
}
