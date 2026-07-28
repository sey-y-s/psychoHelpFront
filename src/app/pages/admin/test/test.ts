import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Route, RouterLink, RouterModule } from "@angular/router";
import { TestService } from "../../../core/services/test.service";
import { CategorieTestService } from "../../../core/services/categorie-test.service";
import { Conseil } from "../../../models/conseil.model";
import { categorieTest } from "../../../models/categorie-test";
import { Router } from "@angular/router";

@Component({
  selector: "app-test",
  imports: [RouterLink, RouterModule],
  templateUrl: "./test.html",
  styleUrl: "./test.css",
})
export class Test implements OnInit {
  constructor(
    private categorieTest: CategorieTestService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) {}
  listCategorie: categorieTest[] = [];

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categorieTest.getCategories().subscribe({
      next: (data) => {
        this.listCategorie = data;
        console.log(data);
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des categories :", err);
      },
    });
  }
  voirTests(id: number) {
    this.router.navigate(["/admin/tests", id]);
  }
}
