import { Component, effect, inject, input, output, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ConseilService } from "../../../../core/services/conseil.service";
import { ConseilInfaceModelForPsyRequest } from "../../../../models/citoyenforPsy.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-conseil-form",
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: "./conseil-form.html",
  styleUrl: "./conseil-form.css",
})
export class ConseilForm {
  conseilService = inject(ConseilService);
  router = inject(Router);

  fermerClic = output<boolean>();
  ajoutReussiMisAjourClic = output<void>();
  annuler() {
    this.fermerClic.emit(false);
  }
  form = new FormGroup({
    titre: new FormControl("", { validators: [Validators.required] }),
    description: new FormControl("", { validators: [Validators.required] }),
  });

   soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
      this.conseilService.ajouterConseil(this.form.value as ConseilInfaceModelForPsyRequest)
      .subscribe({
        next: (response) => {
          //met à jour la liste des conseils
          this.ajoutReussiMisAjourClic.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    
    
  }
}
