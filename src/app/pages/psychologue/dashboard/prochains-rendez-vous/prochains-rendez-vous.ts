import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {RendezVous} from "../../../../models/rendez-vous.model";

@Component({
  selector: "app-prochains-rendez-vous",
  imports: [RouterLink],
  templateUrl: "./prochains-rendez-vous.html",
  styleUrl: "./prochains-rendez-vous.css",
})
export class ProchainsRendezVous {

  @Input()
  rendezVous: RendezVous[] = [];

  get rendezVousAffiches(): RendezVous[] {
    return this.rendezVous.slice(0, 3);
  }

  initiales(rdv: RendezVous): string {
    return (
        `${rdv.prenomCitoyen?.charAt(0) ?? ''}` +
        `${rdv.nomCitoyen?.charAt(0) ?? ''}`
    ).toUpperCase();
  }

  heure(heure: string): string {
    return heure.substring(0, 5);
  }
}
