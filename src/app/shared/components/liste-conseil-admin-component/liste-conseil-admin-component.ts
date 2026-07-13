import {Component, OnInit} from "@angular/core";
import {ConseilAdminService} from "../../../core/services/conseil-admin.service";
import {CommonModule} from "@angular/common";
import {Conseil} from "../../../models/conseil.model";



@Component({
  selector: "app-liste-conseil-admin-component",
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: "./liste-conseil-admin-component.html",
  styleUrl: "./liste-conseil-admin-component.css",
})
export class ListeConseilAdminComponent implements OnInit {

  listConseils: Conseil[] = [];

  constructor(private conseilAdminService: ConseilAdminService) {
  }

  // chargerConseilEnattente():void {
  //   this.conseilAdminService.listerEnAttente()
  // }
  //listConseils = this.conseilAdminService.listerEnAttente()

  ngOnInit(): void {
    this.chargerConseilEnattente()
  }

  chargerConseilEnattente(): void {
    this.conseilAdminService.listerEnAttente().subscribe({
      next: (donnees: Conseil[]) => {
        this.listConseils = donnees;
        console.log("Données reçues du serveur :", this.listConseils);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des conseils :", err);
      }
    });
  }
  valider(id: number | undefined): void {
    if (id === undefined) {
      console.error("Impossible de valider : l'ID du conseil est manquant.");
      return;
    }


    this.conseilAdminService.valider(id).subscribe({
      next: () => {
        console.log("Conseil validé avec succès");
        this.chargerConseilEnattente();
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
      }
    });
  }

}
