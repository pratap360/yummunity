import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from "../components/side-nav-bar/side-nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yummunity';
}
