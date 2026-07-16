import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {RendezVous} from "../../../../models/rendez-vous.model";


@Component({
  selector: "app-rendez-vous-detail",
  imports: [DatePipe, MatIconModule],
  templateUrl: "./rendez-vous-detail.html",
  styleUrl: "./rendez-vous-detail.css",
})
export class RendezVousDetail {

  @Input({ required: true })
  rendezVous!: RendezVous;

  @Input() actionEnCours = false;

  @Output() fermer = new EventEmitter<void>();

  @Output() confirmer = new EventEmitter<RendezVous>();

  @Output() annuler = new EventEmitter<RendezVous>();

  formaterHeure(heure: string): string {
    return heure?.substring(0, 5);
  }

  get peutConfirmer(): boolean {
    return this.rendezVous.statut === 'RESERVER';
  }

  get peutAnnuler(): boolean {
    return (
        this.rendezVous.statut === 'RESERVER' ||
        this.rendezVous.statut === 'CONFIRMER'
    );
  }
}
