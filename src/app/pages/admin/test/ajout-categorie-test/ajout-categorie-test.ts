import { Component, OnInit } from "@angular/core";
import { CategorieTestService } from "../../../../core/services/categorie-test.service";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: "app-ajout-categorie-test",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: "./ajout-categorie-test.html",
  styleUrl: "./ajout-categorie-test.css",
})
export class AjoutCategorieTest implements OnInit {
  categoryForm!: FormGroup;
  showSuccessModal = false;

  constructor(
      private categorieTestService: CategorieTestService,
      private fb: FormBuilder,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.categoryForm = this.fb.group({
      nomCategorie: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dateAjout: [{ value: this.getFormattedDate(), disabled: true }]
    });
  }

  private getFormattedDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.getRawValue();

      this.categorieTestService.creerCategorie(formData).subscribe({
        next: (response) => {
          console.log('Catégorie enregistrée avec succès !', response);
          this.showSuccessModal = true;
          this.categoryForm.reset({
            nomCategorie: '',
            description: '',
            dateAjout: this.getFormattedDate()
          });
        },
        error: (err) => {
          console.error('Erreur lors de l\'envoi au backend :', err);
          alert('Une erreur est survenue lors de l\'ajout.');
        }
      });
    }
  }

  fermerModalEtRediriger(): void {
    this.showSuccessModal = false;
    this.router.navigate(['admin/tests/']);
  }
}
