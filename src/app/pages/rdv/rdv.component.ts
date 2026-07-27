import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SeanceService } from '../../core/services/seance.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-rdv',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule],
  template: `
    <h1 class="page-title">Confirmation du rendez-vous</h1>
    <mat-card>
      <mat-card-content>
        <!-- TODO: Charger et afficher les détails du créneau sélectionné via l'API -->
        <p>Vous êtes sur le point de réserver ce créneau.</p>
        <p><strong>Créneau ID :</strong> {{ creneauId }}</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button routerLink="/psychologues">Annuler</button>
        <button mat-raised-button color="primary" (click)="confirmer()" [disabled]="chargement">
          {{ chargement ? 'Réservation...' : 'Confirmer le rendez-vous' }}
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class PriseRendezvousComponent implements OnInit {
  creneauId: number | null = null;
  chargement = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seanceService: SeanceService,
    private auth: AuthService,
    private notif: NotificationService
  ) {}

  ngOnInit(): void {
    this.creneauId = Number(this.route.snapshot.queryParamMap.get('creneauId'));
    // TODO: Charger les infos du créneau (date, heure, psy) depuis l'API
  }

  confirmer(): void {
    const citoyenId = this.auth.getUtilisateurId();
    if (!citoyenId || !this.creneauId) {
      this.notif.erreur('Informations manquantes');
      return;
    }
    this.chargement = true;
    this.seanceService.prendreRendezVous({ creneauId: this.creneauId, citoyenId }).subscribe({
      next: () => {
        this.notif.succes('Rendez-vous confirmé avec succès');
        this.router.navigate(['/psychologues']);
      },
      error: () => this.chargement = false
    });
  }
}