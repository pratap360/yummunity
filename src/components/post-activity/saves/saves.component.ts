import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  toggleSave(): void {
    this.saved = !this.saved;
    this.saves = this.saved ? this.saves + 1 : this.saves - 1;
    this._snackBar.open('Saved to your profile !!', 'SEE PROFILE', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
