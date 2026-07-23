import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CitoyenRendezVousResponse } from "../../../models/seance.model";
import { AuthService } from "../../../core/services/auth.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-rendezvous",
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: "./rendezvous.html",
  styleUrl: "./rendezvous.css",
})
export class Rendezvous implements OnInit {

    rendezVous: CitoyenRendezVousResponse[] = [];
    rendezVousAVenir: CitoyenRendezVousResponse[] = [];

historiqueRendezVous: CitoyenRendezVousResponse[] = [];
ongletActif: string = 'historique';

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
      private router: Router

  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(utilisateur => {
      if (utilisateur) {
        this.chargerMesRendezVous();
      }
    });

  }
  afficherAvenir(): void {
  this.ongletActif = 'avenir';
}

afficherHistorique(): void {
  this.ongletActif = 'historique';
}

  chargerMesRendezVous(): void {

    this.authService.obtenirMesRendezVous()
      .subscribe({

        next: (rendezVous) => {

          this.rendezVous = rendezVous;

          // Rendez-vous à venir
      this.rendezVousAVenir = rendezVous.filter(
        rdv =>
          rdv.statut === 'RESERVER' ||
          rdv.statut === 'CONFIRMER');

        // Historique
      this.historiqueRendezVous = rendezVous.filter(
        rdv =>
          rdv.statut === 'ANNULER' ||
          rdv.statut === 'TERMINER' );

        console.log('À venir :', this.rendezVousAVenir);
        console.log('Historique :', this.historiqueRendezVous);
        console.log('Mes rendez-vous :', this.rendezVous);

        this.cdRef.detectChanges();
        },

        error: (error) => {

          console.error(
            'Erreur lors du chargement des rendez-vous :',
            error
          );

        }

      });
      }
annulerRendezVous(rdv: CitoyenRendezVousResponse): void {

  const confirmation = confirm(
    `Voulez-vous vraiment annuler le rendez-vous avec Dr. `
    + `${rdv.prenomPsychologue} ${rdv.nomPsychologue} ?`
  );

  if (!confirmation) {
    return;
  }

  this.authService
    .annulerRendezVous(rdv.id)
    .subscribe({

      next: () => {

        alert('Rendez-vous annulé avec succès.');

        // Recharge les rendez-vous
        this.chargerMesRendezVous();

      },

      error: (error) => {

        console.error(
          'Erreur lors de l’annulation :',
          error
        );

        alert(
          'Impossible d’annuler le rendez-vous.'
        );

      }

    });

    
}
voirDetails(id: number): void {
   console.log(
    'ID envoyé :',
    id
  );

  this.router.navigate(['/me/rendez-vous', id]);
}
}
