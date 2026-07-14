import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Creneau} from "../../../../models/creneau.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CreneauCard} from "../creneau-card/creneau-card";

@Component({
  selector: "app-creneau-list",
  imports: [MatProgressSpinnerModule, CreneauCard],
  templateUrl: "./creneau-list.html",
  styleUrl: "./creneau-list.css",
})
export class CreneauList {

  @Input() creneaux: Creneau[] = [];
  @Input() chargement = false;

  @Output() modifier = new EventEmitter<Creneau>();
  @Output() supprimer = new EventEmitter<Creneau>();

  readonly jours = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ];

  jourSelectionne = 'Lundi';

  get creneauxFiltres(): Creneau[] {
    return this.creneaux
        .filter(creneau => creneau.jours === this.jourSelectionne)
        .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
  }
}
