import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConseilAdminService } from '../../core/services/conseil-admin.service';
import { Conseil } from '../../models/conseil.model';
import { NotificationService } from '../../core/services/notification.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { EtatVideComponent } from '../../shared/components/etat-vide.component';

@Component({
  selector: 'app-admin-conseil-validation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, SpinnerComponent, EtatVideComponent],
  template: `
    <h1 class="page-title">Validation des conseils</h1>
    @if (chargement) { <app-spinner></app-spinner> }
    @if (!chargement && liste.length === 0) {
      <app-etat-vide message="Aucun conseil en attente de validation"></app-etat-vide>
    }
    @if (!chargement && liste.length > 0) {
      <table mat-table [dataSource]="liste" class="tableau-plein">
        <ng-container matColumnDef="titre">
          <th mat-header-cell *matHeaderCellDef>Titre</th>
          <td mat-cell *matCellDef="let c">{{ c.titre }}</td>
        </ng-container>
        <ng-container matColumnDef="contenu">
          <th mat-header-cell *matHeaderCellDef>Contenu</th>
          <td mat-cell *matCellDef="let c">{{ c.contenu | slice:0:100 }}...</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let c">
            <button mat-icon-button color="primary" (click)="valider(c.id!)" title="Valider">
              <mat-icon>check_circle</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="rejeter(c.id!)" title="Rejeter">
              <mat-icon>cancel</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
        <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
      </table>
    }
  `,
  styles: [`.tableau-plein { width:100%; }`]
})
export class AdminConseilValidationComponent implements OnInit {
  liste: Conseil[] = [];
  colonnes = ['titre', 'contenu', 'actions'];
  chargement = true;

  constructor(private service: ConseilAdminService, private notif: NotificationService) {}

  ngOnInit(): void {
    this.service.listerEnAttente().subscribe({
      next: data => { this.liste = data; this.chargement = false; },
      error: () => this.chargement = false
    });
  }

  valider(id: number): void {
    this.service.valider(id).subscribe({
      next: () => {
        this.notif.succes('Conseil validé');
        this.liste = this.liste.filter(c => c.id !== id);
      }
    });
  }

  rejeter(id: number): void {
    this.service.rejeter(id).subscribe({
      next: () => {
        this.notif.succes('Conseil rejeté');
        this.liste = this.liste.filter(c => c.id !== id);
      }
    });
  }
}