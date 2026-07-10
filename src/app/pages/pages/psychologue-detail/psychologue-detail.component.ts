import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PsychologueService } from '../../../core/services/psychologue.service';
import { Psychologue } from '../../../models/psychologue.model';
import { Creneau } from '../../../models/creneau.model';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { EtatVideComponent } from '../../../shared/components/etat-vide.component';

@Component({
  selector: 'app-psychologue-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, SpinnerComponent, EtatVideComponent],
  template: `
    @if (chargement) { <app-spinner></app-spinner> }
    @if (!chargement && psy) {
      <div class="conteneur-detail">
        <button mat-button routerLink="/psychologues"><mat-icon>arrow_back</mat-icon> Retour</button>
        <mat-card>
          <mat-card-header>
            <div mat-card-avatar class="avatar-psy-grand">{{ psy.prenom[0] }}{{ psy.nom[0] }}</div>
            <mat-card-title>{{ psy.prenom }} {{ psy.nom }}</mat-card-title>
            <mat-card-subtitle>{{ psy.specialite }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ psy.biographie }}</p>
            <p><strong>Téléphone :</strong> {{ psy.telephone || 'Non renseigné' }}</p>
            <p><strong>Email :</strong> {{ psy.email }}</p>
          </mat-card-content>
        </mat-card>
        <h2 class="titre-section">Créneaux disponibles</h2>
        <!-- TODO: Charger les créneaux depuis l'API /psychologues/{id}/creneaux -->
        <div class="grille-creneaux">
          @for (c of creneaux; track c.id) {
            <mat-card class="carte-creneau">
              <mat-card-content>
                <p><strong>{{ c.date }}</strong></p>
                <p>{{ c.heureDebut }} - {{ c.heureFin }}</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="prendreRDV(c.id!)">Réserver</button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
        @if (creneaux.length === 0) {
          <app-etat-vide message="Aucun créneau disponible pour ce psychologue"></app-etat-vide>
        }
      </div>
    }
  `,
  styles: [`
    .conteneur-detail { max-width:800px; }
    .avatar-psy-grand { background:#009688; color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; width:50px; height:50px; border-radius:50%; }
    .titre-section { margin-top:2rem; }
    .grille-creneaux { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1rem; margin-top:1rem; }
    .carte-creneau { text-align:center; }
  `]
})
export class PsychologueDetailComponent implements OnInit {
  psy: Psychologue | null = null;
  creneaux: Creneau[] = [];
  chargement = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PsychologueService,
    private notif: NotificationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.trouverParId(id).subscribe({
      next: psy => {
        this.psy = psy;
        // TODO: Charger les créneaux du psychologue (appel API dédié)
        this.chargement = false;
      },
      error: () => this.chargement = false
    });
  }

  prendreRDV(creneauId: number): void {
    if (!this.auth.estConnecte()) {
      this.notif.info('Connectez-vous pour prendre rendez-vous');
      this.router.navigate(['/login']);
      return;
    }
    // TODO: Vérifier que l'utilisateur est un citoyen
    this.router.navigate(['/rendezvous/prise'], { queryParams: { creneauId } });
  }
}