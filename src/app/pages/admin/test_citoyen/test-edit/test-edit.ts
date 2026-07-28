import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TestCitoyen } from "../../../../core/services/test-citoyen.service";

@Component({
  selector: "app-test-edit",
  imports: [],
  templateUrl: "./test-edit.html",
  styleUrl: "./test-edit.css",
})
export class TestEdit {
  testForm!: FormGroup;

  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private testService: TestCitoyen,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    // créer le formulaire
    this.testForm = this.fb.group({
      nom_test: ["", Validators.required],

      description: ["", Validators.required],

      etat: [true],
    });

    this.testService.getTestById(this.id).subscribe((data) => {
      this.testForm.patchValue(data);
    });
  }

  modifierTest() {
    this.testService.updateTest(this.id, this.testForm.value).subscribe({
      next: (data) => {
        console.log("Test modifié :", data);

        this.router.navigate(["/tests"]);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
