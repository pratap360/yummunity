import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css'
})
export class SavesComponent {
  saves = 0;
  saved = false;
  toggleSave(): void {
    this.saved = !this.saved;
    this.saves = this.saved ? this.saves + 1 : this.saves - 1;
  }
}
