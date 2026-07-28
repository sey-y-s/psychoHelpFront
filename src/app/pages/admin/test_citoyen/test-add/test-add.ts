import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TestCitoyenService } from "../../../../core/services/test-citoyen.service";


@Component({
  selector: "app-test-add",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./test-add.html",
  styleUrl: "./test-add.css",
})
export class TestAdd {

  testForm!: FormGroup;
  categorieId!: number;

  constructor(
    private fb: FormBuilder,
    private testService: TestCitoyenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.categorieId = Number(
      this.route.snapshot.paramMap.get("categorieId")
    );

    this.testForm = this.fb.group({
      nom_test: ["", Validators.required],
      description: ["", Validators.required],
      etat: [true]
    });
  }


  ajouterTest(): void {

    if (this.testForm.invalid) {
      return;
    }

    this.testService
      .creeTest(this.testForm.value, this.categorieId)
      .subscribe({
        next: (data) => {
          console.log("Test ajouté :", data);

          this.router.navigate([
            "/admin/tests",
            this.categorieId
          ]);
        },

        error: (err) => {
          console.log("Erreur ajout :", err);
        }
      });
  }
  redirectList(){
     this.router.navigate([
            "/admin/tests",
            this.categorieId
          ]);
  }
}
