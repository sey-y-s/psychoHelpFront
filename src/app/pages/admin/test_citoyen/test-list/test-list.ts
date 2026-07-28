import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Test } from "../../../../models/tests";
import { Citoyen } from "../../../public/register/citoyen/citoyen";
import { OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Router, ActivatedRoute, RouterLink } from "@angular/router";
import { TestCitoyen } from "../../../../models/test-citoyen.model";
import { TestCitoyenService } from "../../../../core/services/test-citoyen.service";
import { FormsModule } from '@angular/forms';


@Component({
  selector: "app-test-list",
  standalone: true,

  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterLink
],
  templateUrl: "./test-list.html",
  styleUrl: "./test-list.css",
})
export class TestList {
  constructor(
    private testService: TestCitoyenService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  testCitoyen: TestCitoyen[]=[];
  categorieId!: number;
    motChercher: string = '';


  ngOnInit() {
        this.categorieId = Number(this.route.snapshot.paramMap.get("categorieId"));

    this.testService.getTestsByCategorie(this.categorieId).subscribe({
      next: (data) => {
        this.testCitoyen = data;
        console.log("list recu"+data)
        this.cdRef.detectChanges();
      },
    });
  }
  ajouter() {
     this.router.navigate([
    "/admin/tests/ajout",
    this.categorieId
  ]);
  }
 modifier(test: TestCitoyen) {
  this.router.navigate(
    [
      "/admin/tests/modifier",
      test.id
    ],
    {
      queryParams: {
        categorieId: this.categorieId
      }
    }
  );
}


  supprimerTest(id: number) {
    if (id) {
      this.testService.deleteTest(id).subscribe({
        next: () => {
          console.log("Test supprimé");

          //permettre de  mettre à jour la liste après suppression
          this.testCitoyen = this.testCitoyen.filter((test) => test.id !== id);
        },

        error: (err) => {
          console.log("Erreur suppression :", err);
        },
      });
    }
  }
   get filtrageTest(): TestCitoyen[] {
  
    if (!this.motChercher.trim()) {
      return this.testCitoyen;
    }
  
    const texte = this.motChercher.toLowerCase();
  
    return this.testCitoyen.filter(c =>
      c.nom_test.toLowerCase().includes(texte) ||
      c.description.toLowerCase().includes(texte) 
    );
  
  }
}
