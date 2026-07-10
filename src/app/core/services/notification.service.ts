import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  succes(message: string): void {
    // TODO: Personnaliser la couleur du snackbar (vert)
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  erreur(message: string): void {
    // TODO: Personnaliser la couleur du snackbar (rouge)
    this.snackBar.open(message, 'Fermer', { duration: 5000 });
  }

  info(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }
}