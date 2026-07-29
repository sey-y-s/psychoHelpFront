import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AdminDashboardService } from "../../../core/services/admin.dashboard.service";
import { NotificationService } from "../../../core/services/notification.service";


@Component({
  selector: "app-admin-add",
  standalone: true,
imports: [
  CommonModule,
  ReactiveFormsModule],
    templateUrl: "./admin-add.html",
  styleUrl: "./admin-add.css",
})
export class AdminAdd {
   adminForm!: FormGroup;
    categorieId!: number;
  
    constructor(
      private fb: FormBuilder,
      private adminService:AdminDashboardService ,
      private route: ActivatedRoute,
      private router: Router,
      private notif:NotificationService
    ) {}
  
    ngOnInit(): void {
  
      this.categorieId = Number(
        this.route.snapshot.paramMap.get("categorieId")
      );
  
    this.adminForm = this.fb.group({
  nom: [''],
  prenom: [''],
  mail: [''],
  telephone: [''],
  motDePasse: [''],
});
  
}
 ajouterUtilisateur(): void {

    if (this.adminForm.invalid) {
      return;
    }

    this.adminService.creeAdmin(this.adminForm.value)
      .subscribe({
        next: (data) => {
          console.log("Test ajouté :", data);
                          this.notif.succes("Admin est ajouté avec succes");

          this.router.navigate([
            "/admin/admins",
          ]);
        },

        error: (err) => {
          console.log("Erreur ajout :", err);
        }
      });
  }

  
    redirectList(){
       this.router.navigate([
              "/admin/admins",
            ]);
    }
}
