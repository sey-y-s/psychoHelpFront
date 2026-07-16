import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DatePipe} from "@angular/common";
import {RendezVous, StatutRendezVous} from "../../../../models/rendez-vous.model";

@Component({
  selector: "app-rendez-vous-card",
  imports: [DatePipe],
  templateUrl: "./rendez-vous-card.html",
  styleUrl: "./rendez-vous-card.css",
})
export class RendezVousCard {

  @Input({ required: true })
  rendezVous!: RendezVous;

  @Output() voirDetails = new EventEmitter<RendezVous>();

  formaterHeure(heure: string): string {
    return heure?.substring(0, 5);
  }

  obtenirInitiales(): string {
    const prenom =
        this.rendezVous.prenomCitoyen
            ?.charAt(0) ?? '';

    const nom =
        this.rendezVous.nomCitoyen
            ?.charAt(0) ?? '';

    return `${prenom}${nom}`.toUpperCase();
  }

  obtenirLibelleStatut(
      statut: StatutRendezVous
  ): string {
    switch (statut) {
      case 'RESERVER':
        return 'En attente';

      case 'CONFIRMER':
        return 'À venir';

      case 'TERMINER':
        return 'Terminé';

      case 'ANNULER':
        return 'Annulé';

      default:
        return statut;
    }
  }

  obtenirClasseStatut(
      statut: StatutRendezVous
  ): string {
    switch (statut) {
      case 'RESERVER':
        return 'en-attente';

      case 'CONFIRMER':
        return 'a-venir';

      case 'TERMINER':
        return 'termine';

      case 'ANNULER':
        return 'annule';

      default:
        return '';
    }
  }
}
