import { Component } from "@angular/core";
import {Conseil} from "../../../models/conseil.model";
import {ConseilAdminService} from "../../../core/services/conseil-admin.service";

@Component({
  selector: "app-admin-show-conseil",
  standalone: true,
  imports: [],
  templateUrl: "./admin-show-conseil.html",
  styleUrl: "./admin-show-conseil.css",
})
export class AdminShowConseil {
  estValide: boolean | null = null;
  conseil! : Conseil;

  constructor(private conseilAdminService: ConseilAdminService) {
  }

  getConseil(id: number):void{
    this.conseilAdminService.conseilParId(id).subscribe({
      next: conseil => this.conseil = conseil,
      error: err => console.error(err)
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
        //this.chargerConseils();
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
      }
    });
  }

  toggleStatut(/*id:number*/) {
    this.estValide = !this.estValide;
    console.log("Nouveau statut du conseil :", this.estValide ? 'Validé' : 'Non validé');
    //this.valider(id);
  }

}