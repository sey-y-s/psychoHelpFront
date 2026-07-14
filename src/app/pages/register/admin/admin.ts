import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-admin",
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
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  
      messageErreur = '';

    cacheMotDePasse = true;

    formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', Validators.required]
    });

  }
 // Methode pour inscription 
  inscrire() {

    console.log("Le bouton fonctionne");
    console.log("Valeurs actuelles :", this.formulaire.value);
  console.log("Formulaire valide ?", this.formulaire.valid);

  if (this.formulaire.invalid) {

    console.warn("Formulaire invalide ! Erreurs :", this.formulaire.errors);
    // On affiche l'état de chaque champ
    Object.keys(this.formulaire.controls).forEach(key => {
      const control = this.formulaire.get(key);
      if (control?.invalid) {
        console.log(`Le champ '${key}' est invalide :`, control.errors);
      }
    });
      this.messageErreur = 'Veuillez remplir tous les champs obligatoires.';

    return;
  }

  this.authService
      .inscrireAdmin(this.formulaire.value)
      .subscribe({

        next: (reponse) => {

          console.log(reponse);
          alert("Inscription réussie !");

          this.formulaire.reset();

        },

       error: (err) => {
    // Affiche TOUT le détail de l'erreur renvoyée par Java
    let messageErreur = "Administrateur inscrit avec succès !";

    //pour vider les champs du formulaire
    this.formulaire.reset();

    // Détection selon le code d'erreur HTTP ou le contenu du message
    if (err.status === 500 && err.error?.message?.includes("Duplicate entry")) {
      messageErreur = "Cette adresse email ou ce numéro de téléphone est déjà utilisé.";
    } else if (err.status === 400) {
      messageErreur = "Veuillez vérifier les informations saisies.";
    } else if (err.status === 0) {
      messageErreur = "Impossible de contacter le serveur. Vérifiez votre connexion.";
    }

    // Affichage du message propre à l'utilisateur
    alert(messageErreur);
  
  }

      });

}

}
