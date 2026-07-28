import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Test } from "../../../../models/tests";
import { TestCitoyen } from "../../../../core/services/test-citoyen.service";
import { Citoyen } from "../../../public/register/citoyen/citoyen";
import { OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-test-list",
  standalone: true,

  imports: [CommonModule, MatIconModule],
  templateUrl: "./test-list.html",
  styleUrl: "./test-list.css",
})
export class TestList {
  constructor(
    private testService: TestCitoyen,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  testCitoyen: TestCitoyen[] = [];
  categorieId!: number;

  ngOnInit() {
    this.testService.getAllTests().subscribe({
      next: (data) => {
        this.testCitoyen = data;
        this.cdRef.detectChanges();
      },
    });
    this.categorieId = Number(this.route.snapshot.paramMap.get("categorieId"));
  }
  ajouter() {
    this.router.navigate(["/tests/add"]);
  }
  modifier(test: TestCitoyen) {
    this.router.navigate(["/editTest", test.id]);
  }
  visualiser(id: number) {
    if (id) {
      this.router.navigate(["/tests/detail", id]);
    }
  }

  supprimerTest(id: number) {
    if (id) {
      this.testService.deleteTest(id).subscribe({
        next: () => {
          console.log("Test supprimé");

          // mettre à jour la liste après suppression
          this.testCitoyen = this.testCitoyen.filter((test) => test.id !== id);
        },

        error: (err) => {
          console.log("Erreur suppression :", err);
        },
      });
    }
  }
}
