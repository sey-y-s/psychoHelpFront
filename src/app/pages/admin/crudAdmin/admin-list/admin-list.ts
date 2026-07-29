import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Test } from "../../../../models/tests";
import { Citoyen } from "../../../public/register/citoyen/citoyen";
import { OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Router, ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AdminDashboardService } from "../../../../core/services/admin.dashboard.service";
import { Admin } from "../../../../models/admin.model";
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
    ) {}
    AdminList: AdminAdd[]=[];
      motChercher: string = '';
  
  
    ngOnInit() {
  
      this.AdminService.getListAdmin().subscribe({
        next: (data) => {
          this.AdminList = data;
          console.log("list recu"+data)
          this.cdRef.detectChanges();
        },
      });
    }
    ajouter() {
  this.router.navigate([
    "/admin/admins/ajouter",
  ]);
}


modifier(admin: AdminAdd) {
  this.router.navigate([
    "/admin/admins/modifier",
    admin.id
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
