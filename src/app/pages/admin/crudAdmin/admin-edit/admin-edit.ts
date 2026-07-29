import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TestCitoyenService } from "../../../../core/services/test-citoyen.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {  ChangeDetectorRef } from "@angular/core";
import { NotificationService } from "../../../../core/services/notification.service";
import { AdminDashboardService } from "../../../../core/services/admin.dashboard.service";

@Component({
  selector: "app-admin-edit",
   standalone: true,

  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: "./admin-edit.html",
  styleUrl: "./admin-edit.css",
})
export class AdminEdit {
  adminForm!: FormGroup;

  id!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminDashboardService,
    private router: Router,
        private cdRef: ChangeDetectorRef,
        private notif:NotificationService

  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get("id"));



  this.adminForm = this.fb.group({
  nom: [''],
  prenom: [''],
  mail: [''],
  telephone: [''],
  mot_de_passe: ['']
});

    this.adminService.AdminById(this.id).subscribe((data) => {
      this.adminForm.patchValue(data);
          console.log("Données reçues :", data);

    });
  }

  modifierAdmin() {
    this.adminService.updateTest(this.id, this.adminForm.value).subscribe({
      next: (data) => {
        console.log("Test modifié :", data);
                this.cdRef.detectChanges();
                this.notif.succes("Test modifié avec succes");

this.router.navigate([
  "/admin/admins",
  
]);  
  },

      error: (err) => {
        console.log(err);
        this.notif.erreur("Erreur lors de le modification de l'admin")
      },
    });
  }
  redirectList(){
    this.router.navigate([
  "/admin/admins",
]);  
  }
}
