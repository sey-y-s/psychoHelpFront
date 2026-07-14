import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {Creneau} from "../../../../models/creneau.model";

@Component({
  selector: "app-creneau-card",
  imports: [MatIconModule],
  templateUrl: "./creneau-card.html",
  styleUrl: "./creneau-card.css",
})
export class CreneauCard {

  @Input({ required: true }) creneau!: Creneau;

  @Output() modifier = new EventEmitter<Creneau>();
  @Output() supprimer = new EventEmitter<Creneau>();

  formaterHeure(heure: string): string {
    return heure.substring(0, 5);
  }


}
