// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { PsychologueService } from '../../core/services/psychologue.service';
// import { Psychologue } from '../../models/psychologue.model';
// import { SpinnerComponent } from '../../shared/components/spinner.component';
// import { EtatVideComponent } from '../../shared/components/etat-vide.component';

// @Component({
//   selector: 'app-psychologue-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, SpinnerComponent, EtatVideComponent],
//   template: `
//     <h1 class="page-title">Nos Psychologues</h1>
//     <!-- TODO: Ajouter barre de recherche et filtre par spécialité -->
//     @if (chargement) { <app-spinner></app-spinner> }
//     @if (!chargement && liste.length === 0) {
//       <app-etat-vide message="Aucun psychologue disponible"></app-etat-vide>
//     }
//     @if (!chargement) {
//       <div class="grille-psy">
//         @for (psy of liste; track psy.id) {
//           <mat-card class="carte-psy" [routerLink]="['/psychologues', psy.id]">
//             <mat-card-header>
//               <div mat-card-avatar class="avatar-psy">{{ psy.prenom[0] }}{{ psy.nom[0] }}</div>
//               <mat-card-title>{{ psy.prenom }} {{ psy.nom }}</mat-card-title>
//               <mat-card-subtitle>{{ psy.specialite }}</mat-card-subtitle>
//             </mat-card-header>
//             <mat-card-content>
//               <p>{{ psy.biographie || 'Aucune biographie' }}</p>
//             </mat-card-content>
//             <mat-card-actions align="end">
//               <button mat-button color="primary">Voir les créneaux</button>
//             </mat-card-actions>
//           </mat-card>
//         }
//       </div>
//     }
//   `,
//   styles: [`
//     .grille-psy { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:1rem; }
//     .carte-psy { cursor:pointer; transition:transform 0.2s; }
//     .carte-psy:hover { transform:translateY(-2px); }
//     .avatar-psy { background:#009688; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; }
//   `]
// })
// export class PsychologueListComponent implements OnInit {
//   liste: Psychologue[] = [];
//   chargement = true;

//   constructor(private service: PsychologueService) {}

//   ngOnInit(): void {
//     // TODO: Ajouter pagination côté API et UI
//     this.service.lister().subscribe({
//       next: data => { this.liste = data; this.chargement = false; },
//       error: () => this.chargement = false
//     });
//   }
// }