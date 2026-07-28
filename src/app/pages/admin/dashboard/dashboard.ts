import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {DashboardService} from "../../../core/services/dashboard.service";
import {AdminDashboardService} from "../../../core/services/admin.dashboard.service";
import {DashboardStats, User} from "../../../models/admin.dashboard.model";
import {takeUntil} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-dashboard",
  imports: [
    MatIcon,
    RouterLink
  ],
  standalone: true,
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard implements OnInit {
  totalConseil = 0;
  totalTest = 0;
  totalUtilisateur = 0;
  totalRendezVous = 0;
  utilisateurs: User[] = [];


  constructor(private adminDashboardServic:AdminDashboardService, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.chargerDashboard()
  }

  chargerDashboard():void {
    this.adminDashboardServic.getDashboard().subscribe({
      next: (data: DashboardStats) => {

        this.totalTest = data.TotalTest;
        this.totalRendezVous = data.TotalRdv;
        this.totalUtilisateur = data.TotalUtilisateur;
        this.totalConseil = data.TotalConseil;
        this.utilisateurs = data.utilisateursRecent

        this.cdRef.detectChanges();
        console.log(data.utilisateursRecent)
        //console.log(data)
      },
      error(err){
        console.error("Erreur lors de la récupération du dashboard :", err);
      }
    })
  }



}
