import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FiltreRendezVous} from "../../../../models/rendez-vous.model";
import {MatIconModule} from "@angular/material/icon";

interface FiltreOption {
  valeur: FiltreRendezVous;
  libelle: string;
}

@Component({
  selector: "app-rendez-vous-filtres",
  imports: [MatIconModule],
  templateUrl: "./rendez-vous-filtres.html",
  styleUrl: "./rendez-vous-filtres.css",
})
export class RendezVousFiltres {

  @Input() filtreActif: FiltreRendezVous = 'TOUS';

  @Output() filtreChange = new EventEmitter<FiltreRendezVous>();

  @Output() exporter = new EventEmitter<void>();

  readonly filtres: FiltreOption[] = [
    { valeur: 'TOUS', libelle: 'Tous' },
    { valeur: 'A_VENIR', libelle: 'À venir' },
    { valeur: 'AUJOURD_HUI', libelle: 'Aujourd’hui' },
    { valeur: 'TERMINES', libelle: 'Terminés' },
    { valeur: 'ANNULES', libelle: 'Annulés' }
  ];

  selectionner(filtre: FiltreRendezVous): void {
    this.filtreChange.emit(filtre);
  }
}
