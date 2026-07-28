import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Conseil } from "../../../../models/conseil.model";
import { ConseilAdminService } from "../../../../core/services/conseil-admin.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../../core/services/notification.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-admin-show-conseil",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./admin-show-conseil.html",
  styleUrl: "./admin-show-conseil.css",
})
export class AdminShowConseil implements OnInit {
  estValide: boolean | null = null;
  statutActuel: string = 'ENATTENTE';
  conseil?: Conseil;

  constructor(
      private conseilAdminService: ConseilAdminService,
      private cdRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl) {
      this.getConseil(+idUrl);
    } else {
      console.error("Aucun ID trouvé dans l'URL");
    }
  }

  getConseil(id: number): void {
    this.conseilAdminService.conseilParId(id).subscribe({
      next: (conseil: Conseil) => {
        this.conseil = conseil;
        this.statutActuel = conseil.status;
        this.cdRef.markForCheck();
      },
      error: (err: any) => console.error(err)
    });
  }

  valider(id: number | undefined, statut: string): void {
    if (id === undefined) return;
    this.conseilAdminService.valider(id).subscribe({
      next: () => {
        this.notifService.succes("Conseil validé avec succès");
      },
      error: (err: any) => {
        console.error("Erreur lors de la validation :", err);
        this.cdRef.markForCheck();
      }
    });
  }

  rejeter(id: number | undefined, statut: string): void {
    if (id === undefined) return;
    this.conseilAdminService.rejeter(id).subscribe({
      next: () => {
        this.notifService.erreur("Le conseil a été refusé et masqué pour les utilisateurs.");
      },
      error: (err: any) => {
        console.error("Erreur lors du rejet :", err);
        this.cdRef.markForCheck();
      }
    });
  }

  toggleStatut(): void {
    if (!this.conseil) return;

    if (this.statutActuel === 'ENATTENTE' || this.statutActuel === 'REFUSER') {
      this.statutActuel = 'VALIDER';
      this.valider(this.conseil.id, this.statutActuel);
    } else {
      this.statutActuel = 'REFUSER';
      this.rejeter(this.conseil.id, this.statutActuel);
    }

    this.cdRef.markForCheck();
  }
}