import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {ConseilAdminService} from "../../../core/services/conseil-admin.service";
import {CommonModule} from "@angular/common";
import {Conseil} from "../../../models/conseil.model";
import {CardValidationConseil} from "./card-validation/card-validation";
import { RouterModule } from "@angular/router";
import {NotificationService} from "../../../core/services/notification.service";
@Component({
  selector: "app-liste-conseil-admin-component",
  standalone: true,
    imports: [
        CommonModule,
        CardValidationConseil,
        RouterModule
    ],
  templateUrl: "./liste-conseil-admin-component.html",
  styleUrl: "./liste-conseil-admin-component.css",
})
export class ListeConseilAdminComponent implements OnInit {
  tousLesConseils: Conseil[] = [];
  listConseils: Conseil[] = [];

  constructor(
      private conseilAdminService: ConseilAdminService,
      private cdRef: ChangeDetectorRef,
      private notifService : NotificationService
      ) {
  }
 /* private conseilAdminService: ConseilAdminService,
  private cdRef: ChangeDetectorRef
*/
  filtreActif: string = 'tous';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.chargerConseils()
    //this.notifService.succes("test")
  }
  changerFiltre(newfiltre: string): void {
    this.filtreActif = newfiltre;
    if (newfiltre==='tous'){
      this.listConseils = [...this.tousLesConseils]
    } else if (newfiltre === 'attente'){
      this.listConseils = this.tousLesConseils.filter(c => c.status === "ENATTENTE")
      console.log(this.listConseils)
    }else if (newfiltre === 'valider'){
      this.listConseils = this.tousLesConseils.filter(c => c.status === "VALIDER")
      console.log(this.listConseils)
    }else if(newfiltre === 'refuser'){
      this.listConseils = this.tousLesConseils.filter(c => c.status === "REFUSER")
      console.log(this.listConseils)
    }

  }

  chargerConseils(): void {
    this.isLoading = true;
    this.conseilAdminService.listTousConseils().subscribe({
      next: (donnees: Conseil[]) => {
        this.tousLesConseils = donnees.sort((a, b) => b.id - a.id);
        this.changerFiltre(this.filtreActif);
        //this.listConseils = donnees;
        //this.cdRef.detectChanges();
        this.isLoading = false;
        this.cdRef.markForCheck();
        console.log("Données reçues du serveur :", this.tousLesConseils);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des conseils :", err);
        this.isLoading = false;
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
        this.chargerConseils();
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
      }
    });
  }
}
