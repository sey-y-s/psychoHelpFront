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
    const maintenant = new Date();
    const heureActuelleEnMinutes = maintenant.getHours() * 60 + maintenant.getMinutes();
    return this.creneaux
        .filter((creneau) => this.enMinutes(creneau.heureFin) > heureActuelleEnMinutes)
        .slice(0, 4);
  }

  private enMinutes(heure: string): number {
    const [heures, minutes] = heure.substring(0, 5).split(':').map(Number);
    return heures * 60 + minutes;
  }

  heure(heure: string): string {
    return heure.substring(0, 5);
  }
}
