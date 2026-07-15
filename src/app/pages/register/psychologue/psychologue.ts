import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../../core/services/auth.service";
import { Specialite } from '../../../models/specialite.model';
import { SpecialiteService } from "../../../core/services/specialite-service";
import { Router } from '@angular/router';

@Component({
  selector: "app-psychologue",
  standalone : true,
  imports: [
    CommonModule,
     ReactiveFormsModule,
     FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: "./psychologue.html",
  styleUrl: "./psychologue.css",
})
export class Psychologue {

  messageErreur = '';
  cvManquant = false;
diplomeManquant = false;
specialites: Specialite[] = [];
  cv: File | null = null;
diplome: File | null = null;

cacheMotDePasse = true;

formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private specialiteService: SpecialiteService,
    private router: Router

  ) {

    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', Validators.required],
      description: [''],
      idSpecialite: ['', Validators.required]

    });

  }

  ngOnInit() {
  this.specialiteService.getAll().subscribe({
    next: (data) => {
      console.log("Spécialités :", data);
      this.specialites = data;
    }
  });
}
 // Methode pour inscription 
  inscrire() {

    this.cvManquant = !this.cvFile;
this.diplomeManquant = !this.diplomeFile;

if (
  this.formulaire.invalid ||
  this.cvManquant ||
  this.diplomeManquant
) {
  this.messageErreur = 'Veuillez remplir tous les champs obligatoires.';
  return;
}

  console.log("Le bouton fonctionne");
  console.log("Valeurs actuelles :", this.formulaire.value);
  console.log("Formulaire valide ?", this.formulaire.valid);

  if (this.formulaire.invalid) {

    console.warn("Formulaire invalide !");

    Object.keys(this.formulaire.controls).forEach(key => {
      const control = this.formulaire.get(key);
      if (control?.invalid) {
        console.log(`Le champ '${key}' est invalide :`, control.errors);
      }
    });

    this.formulaire.markAllAsTouched();
    return;
  }

  const psychologue = {
    ...this.formulaire.value,
    cv_path: this.cvFileName,
    diplome_path: this.diplomeFileName
  };

  this.authService
    .inscrirePsychologue(psychologue)
    .subscribe({

      next: (reponse) => {

        console.log(reponse);
        alert(  "Votre demande d'inscription a été enregistrée avec succès.\n\n" +
        "Votre compte est en attente de validation par un administrateur.");

        this.formulaire.reset();
        this.cvFile = null;
        this.diplomeFile = null;
        this.cvFileName = '';
        this.diplomeFileName = '';

      },

      error: (err) => {

        let messageErreur = "Erreur lors de l'inscription.";

        if (err.status === 500 && err.error?.message?.includes("Duplicate entry")) {
          messageErreur = "Cette adresse email ou ce numéro de téléphone est déjà utilisé.";
        } else if (err.status === 400) {
          messageErreur = "Veuillez vérifier les informations saisies.";
        } else if (err.status === 0) {
          messageErreur = "Impossible de contacter le serveur. Vérifiez votre connexion.";
        }

        alert(messageErreur);

      }

    });

}

cvFile: File | null = null;
cvFileName: string = '';

diplomeFile: File | null = null;
diplomeFileName: string = '';

// Capture du CV
onCvSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.cvFile = file;
    this.cvFileName = file.name; // Affiche le nom du fichier dans l'input
  }
}

// Capture du Diplôme
onDiplomeSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.diplomeFile = file;
    this.diplomeFileName = file.name; // Affiche le nom du fichier dans l'input
  }
}


retour(): void {
  this.router.navigate(['/login']);
}

}
