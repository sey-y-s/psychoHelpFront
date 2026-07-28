import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TestCitoyenService } from "../../../../core/services/test-citoyen.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {  ChangeDetectorRef } from "@angular/core";
import { NotificationService } from "../../../../core/services/notification.service";


@Component({
  selector: "app-test-edit",
    standalone: true,

  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: "./test-edit.html",
  styleUrl: "./test-edit.css",
})
export class TestEdit {
  testForm!: FormGroup;

  id!: number;
categorieId!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private testService: TestCitoyenService,
    private router: Router,
        private cdRef: ChangeDetectorRef,
        private notif:NotificationService

  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
  this.categorieId = Number(
    this.route.snapshot.queryParamMap.get("categorieId")
  );
  console.log("Categorie reçue :", this.categorieId);


    this.testForm = this.fb.group({
      nom_test: ["", Validators.required],

      description: ["", Validators.required],

      etat: [true],
    });

    this.testService.getTestById(this.id).subscribe((data) => {
      this.testForm.patchValue(data);
          console.log("Données reçues :", data);

    });
  }

  modifierTest() {
    this.testService.updateTest(this.id, this.testForm.value).subscribe({
      next: (data) => {
        console.log("Test modifié :", data);
                this.cdRef.detectChanges();
                this.notif.succes("Test modifié avec succes");

this.router.navigate([
  "/admin/tests",
  this.categorieId
]);  
console.log("verif"+this.categorieId)  },

      error: (err) => {
        console.log(err);
        this.notif.erreur("Erreur lors de le modification du test")
      },
    });
  }
  redirectList(){
    this.router.navigate([
  "/admin/tests",
  this.categorieId
]);  
  }
}
