import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from "../components/side-nav-bar/side-nav-bar.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    SideNavBarComponent,
    LoginComponent, 
    SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yummunity';

}
