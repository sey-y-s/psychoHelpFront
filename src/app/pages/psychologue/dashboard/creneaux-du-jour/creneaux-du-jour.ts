import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Creneau} from "../../../../models/creneau.model";

@Component({
  selector: "app-creneaux-du-jour",
  imports: [RouterLink],
  templateUrl: "./creneaux-du-jour.html",
  styleUrl: "./creneaux-du-jour.css",
})
export class CreneauxDuJour {

  @Input()
  creneaux: Creneau[] = [];

  get creneauxAffiches(): Creneau[] {
    return this.creneaux.slice(0, 4);
  }

  heure(heure: string): string {
    return heure.substring(0, 5);
  }
}
