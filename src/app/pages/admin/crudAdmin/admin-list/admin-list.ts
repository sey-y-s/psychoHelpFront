import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AdminDashboardService } from "../../../../core/services/admin.dashboard.service";
import { AdminAdd } from "../../../../models/adminAdd.model";
@Component({
  selector: "app-admin-list",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: "./admin-list.html",
  styleUrl: "./admin-list.css",
})
export class AdminList {
  constructor(
    private AdminService: AdminDashboardService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  AdminList: AdminAdd[] = [];
  motChercher: string = '';


  ngOnInit() {

    this.AdminService.getListAdmin().subscribe({
      next: (data) => {
        this.AdminList = data;
        console.log("list recu" + data)
        this.cdRef.detectChanges();
      },
    });
  }
  ajouter() {
    this.router.navigate([
      "/register/admin",
    ]);
  }



  get filtrageAdmin(): AdminAdd[] {

    if (!this.motChercher.trim()) {
      return this.AdminList;
    }

    const texte = this.motChercher.toLowerCase();

    return this.AdminList.filter(c =>
      c.nom.toLowerCase().includes(texte) ||
      c.prenom.toLowerCase().includes(texte) ||
      c.mail.toLocaleLowerCase().includes(texte)
    );

  }
}
