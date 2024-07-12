import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ISnackbarData } from '../../../interfaces/snack-bar.interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatButtonModule,
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  message = '';
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarData) {
    this.message = data.message;
  }
}
