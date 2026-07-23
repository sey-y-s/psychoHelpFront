import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../../core/services/auth.service";
import { Utilisateur } from "../../../models/utilisateur.model";
import { RouterLink } from "@angular/router";
import { Conseil, ConseilAffiche } from "../../../models/conseil.model";
import { CitoyenRendezVousResponse } from "../../../models/seance.model";

@Component({
  selector: "app-dashboard",
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard implements OnInit {

  prochainRendezVous: CitoyenRendezVousResponse  | null = null;
  citoyenConnecte: Utilisateur | null = null;
  nombrePsychologues = 0;
  nombreConseils = 0;
  nombreTestEffectues = 0;
  conseils: ConseilAffiche[] = [];

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef // permet de raffaichir la vue cote angular

  ) { }

  ngOnInit(): void {

    this.authService.currentUser$
      .subscribe(utilisateur => {
        this.citoyenConnecte = utilisateur;


        // Vérifier que l'utilisateur existe
        if (utilisateur && utilisateur.id !== undefined) {

          const citoyenId = utilisateur.id;

          // Récupérer le nombre de tests effectués
          this.authService
            .obtenirResultatsParCitoyen(citoyenId)
            .subscribe({
              next: (resultats) => {

                this.nombreTestEffectues = resultats.length;

                console.log(
                  "Nombre de tests effectués :",
                  this.nombreTestEffectues
                );

                this.cdRef.detectChanges();
              },

              error: (error) => {

                console.error(
                  "Erreur lors de la récupération des tests effectués :",
                  error
                );

                this.nombreTestEffectues = 0;
              }
            });
        }
      });

    // Récupérer les psychologues validés
    this.authService.listerPsychologuesValides()
      .subscribe({
        next: (psychologues) => {
          this.nombrePsychologues = psychologues.length; // permet de donner le nombre de psy valider

          console.log('Valeur de la variable :', this.nombrePsychologues);

          console.log("Nombre de psychologues validés :", this.nombrePsychologues);

          this.cdRef.detectChanges(); // Force Angular à rendre le HTML avec la nouvelle valeur !
        },
        error: (err) => {
          console.error(
            'Erreur lors du chargement des psychologues',
            err);

        }
      });

    // Récupérer les conseils validés

    this.authService.listerConseilsValides()
      .subscribe({
        next: (conseils) => {

          console.log("Conseils reçus :", conseils);
 
    this.nombreConseils = conseils.length;

          this.conseils = conseils.slice(0, 2); // pour afficher les deux conseils sur le dashboard



          console.log(
            "Nombre total de conseils :",
            this.nombreConseils
          );

           console.log("Conseils recommandés :", this.conseils);
          this.cdRef.detectChanges();

        },
        error: (err) => {
          console.error(
            "Erreur lors du chargement des conseils",
            err
          );
        }
      });

      // Pour le rendez-vous
      this.authService
  .obtenirMesRendezVous()
  .subscribe({
    next: (rendezVous) => {

      console.log("Rendez-vous reçus :", rendezVous);

      console.log("Rendez-vous reçus :", JSON.stringify(rendezVous, null, 2));

      if (rendezVous && rendezVous.length > 0) {
          // On cherche en priorité le premier RDV actif (non annulé)
const rdvConfirme = rendezVous.find(rdv => rdv.statut === 'CONFIRMER' || rdv.statut === 'CONFIRME');          
// S'il existe un rendez-vous confirmé, on l'affiche, sinon on laisse null
        this.prochainRendezVous = rdvConfirme || null; 
       }
       else {
        this.prochainRendezVous = null;
      }

        this.cdRef.detectChanges();
    },

    error: (err) => {
      console.error(
        "Erreur lors de la récupération des rendez-vous :",
        err
      );
      this.prochainRendezVous = null;
    }
  });
  }



}
