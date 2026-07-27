import {Component, ChangeDetectorRef, OnInit} from "@angular/core";
import {Conseil} from "../../../../models/conseil.model";
import {ConseilAdminService} from "../../../../core/services/conseil-admin.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-admin-show-conseil",
  standalone: true,
  imports: [],
  templateUrl: "./admin-show-conseil.html",
  styleUrl: "./admin-show-conseil.css",
})
export class AdminShowConseil implements OnInit{
  estValide: boolean | null = null;
  statutActuel: string = 'ENATTENTE';
  conseil? : Conseil;

  constructor(
      private conseilAdminService: ConseilAdminService,
      private cdRef: ChangeDetectorRef,
      private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl) {
      this.getConseil(+idUrl);
    } else {
      console.error("Aucun ID trouvé dans l'URL");
    }
    //this.getConseil(1);
  }

  getConseil(id: number):void{
    this.conseilAdminService.conseilParId(id).subscribe({
      next: (conseil: Conseil) => {
        this.conseil = conseil;
        //this.estValide = conseil.status === "VALIDER";
        this.statutActuel = conseil.status;
        this.cdRef.markForCheck();
      },
      error: (err: any) => console.error(err)
    });
  }

  valider(id: number | undefined, statut: string): void {
    if (id === undefined) {
      console.error("Impossible de valider : l'ID du conseil est manquant.");
      return;
    }
    this.conseilAdminService.valider(id).subscribe({
      next: () => {
        console.log(`Conseil mis à jour sur le serveur : ${statut}`);
        //this.chargerConseils();
      },
      error: (err: any) => {
        console.error("Erreur lors de la validation :", err);
        this.estValide = !this.estValide;
        this.cdRef.markForCheck();
      }
    });
  }

  rejeter(id: number | undefined, statut: string): void {
    if (id === undefined) {
      console.error("Impossible de rejeter : l'ID du conseil est manquant.");
      return;
    }
    this.conseilAdminService.rejeter(id).subscribe({
      next: () => {
        console.log(`Conseil mis à jour sur le serveur : ${statut}`);
        //this.chargerConseils();
      },
      error: (err: any) => {
        console.error("Erreur lors de la validation :", err);
        this.estValide = !this.estValide;
        this.cdRef.markForCheck();
      }
    });
  }



  toggleStatut(/*id:number*/) {
    if (!this.conseil) return;
    this.estValide = !this.estValide;
    const ancienStatut = this.statutActuel;

    if (this.statutActuel === 'ENATTENTE' || this.statutActuel === 'REFUSER') {
      this.statutActuel = 'VALIDER';
      this.valider(this.conseil.id, this.statutActuel);
    } else {
      this.statutActuel = 'REFUSER';
      this.rejeter(this.conseil.id, this.statutActuel);
    }
    console.log("Nouveau statut du conseil :", this.estValide ? 'Validé' : 'Non validé');
    //this.valider(this.conseil.id, this.statutActuel);
    this.cdRef.markForCheck();
  }

}