import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatIconModule],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css',
})
export class SavesComponent {
  saves = 0;
  saved = false;
  durationInSeconds = 5;
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  toggleSave(): void {
    this.saved = !this.saved;
    this.saves = this.saved ? this.saves + 1 : this.saves - 1;
    if (this.saved) {
     const snackBarRef = this._snackBar.open('Saved to your profile !!', 'SEE PROFILE', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      // Subscribe to the snackbar action to navigate to the profile page
      snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/account']);
            });
    } else {
      this._snackBar.open('Removed from your profile !!', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }
}
