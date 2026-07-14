// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { PsychologueAdminService } from '../../core/services/psychologue-admin.service';
// import { Psychologue } from '../../models/psychologue.model';
// import { NotificationService } from '../../core/services/notification.service';
// import { SpinnerComponent } from '../../shared/components/spinner.component';
// import { EtatVideComponent } from '../../shared/components/etat-vide.component';

// @Component({
//   selector: 'app-admin-psychologue-validation',
//   standalone: true,
//   imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, SpinnerComponent, EtatVideComponent],
//   template: `
//     <h1 class="page-title">Validation des psychologues</h1>
//     @if (chargement) { <app-spinner></app-spinner> }
//     @if (!chargement && liste.length === 0) {
//       <app-etat-vide message="Aucun psychologue en attente de validation"></app-etat-vide>
//     }
//     @if (!chargement && liste.length > 0) {
//       <!-- TODO: Ajouter pagination et tri -->
//       <table mat-table [dataSource]="liste" class="tableau-plein">
//         <ng-container matColumnDef="nom">
//           <th mat-header-cell *matHeaderCellDef>Nom</th>
//           <td mat-cell *matCellDef="let psy">{{ psy.prenom }} {{ psy.nom }}</td>
//         </ng-container>
//         <ng-container matColumnDef="email">
//           <th mat-header-cell *matHeaderCellDef>Email</th>
//           <td mat-cell *matCellDef="let psy">{{ psy.email }}</td>
//         </ng-container>
//         <ng-container matColumnDef="specialite">
//           <th mat-header-cell *matHeaderCellDef>Spécialité</th>
//           <td mat-cell *matCellDef="let psy">{{ psy.specialite }}</td>
//         </ng-container>
//         <ng-container matColumnDef="actions">
//           <th mat-header-cell *matHeaderCellDef>Actions</th>
//           <td mat-cell *matCellDef="let psy">
//             <button mat-icon-button color="primary" (click)="valider(psy.id!)" title="Valider">
//               <mat-icon>check_circle</mat-icon>
//             </button>
//             <button mat-icon-button color="warn" (click)="rejeter(psy.id!)" title="Rejeter">
//               <mat-icon>cancel</mat-icon>
//             </button>
//           </td>
//         </ng-container>
//         <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
//         <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
//       </table>
//     }
//   `,
//   styles: [`.tableau-plein { width:100%; }`]
// })
// export class AdminPsychologueValidationComponent implements OnInit {
//   liste: Psychologue[] = [];
//   colonnes = ['nom', 'email', 'specialite', 'actions'];
//   chargement = true;

//   constructor(private service: PsychologueAdminService, private notif: NotificationService) {}

//   ngOnInit(): void {
//     this.service.listerEnAttente().subscribe({
//       next: data => { this.liste = data; this.chargement = false; },
//       error: () => this.chargement = false
//     });
//   }

//   valider(id: number): void {
//     // TODO: Ajouter dialogue de confirmation avant validation
//     this.service.valider(id).subscribe({
//       next: () => {
//         this.notif.succes('Psychologue validé');
//         this.liste = this.liste.filter(p => p.id !== id);
//       }
//     });
//   }

//   rejeter(id: number): void {
//     // TODO: Ajouter dialogue de confirmation avant rejet
//     this.service.rejeter(id).subscribe({
//       next: () => {
//         this.notif.succes('Psychologue rejeté');
//         this.liste = this.liste.filter(p => p.id !== id);
//       }
//     });
//   }
// }