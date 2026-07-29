import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from "@angular/router";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: "app-citoyen",
  standalone : true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: "./citoyen.html",
  styleUrl: "./citoyen.css",
})
export class Citoyen {
  
    messageErreur = '';
  cacheMotDePasse = true;

  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private notif : NotificationService
    
  ) {

    this.formulaire = this.fb.group({
      nom: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
      ]],

      prenom: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
      ]],

      mail: ['', [
        Validators.required,
        Validators.email
      ]],

      motDePasse: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],

      telephone: ['', [
        Validators.required,
        Validators.pattern(/^0[67][0-9]{8}$/)
      ]]
    });

  }
 // Methode pour inscription 
  inscrire() {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      this.messageErreur =
          'Veuillez remplir correctement tous les champs obligatoires.';
      return;
    }
  this.authService
      .inscrireCitoyen(this.formulaire.value)
      .subscribe({

        next: (reponse) => {

          console.log(reponse);
          this.notif.succes("Inscription réussie !");

          this.formulaire.reset();
          //this.router.navigate(['/me']);

        },

       error: (err) => {
    // Affiche TOUT le détail de l'erreur renvoyée par Java
    let messageErreur = "Erreur lors de l'inscription !";

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
    this.notif.erreur(messageErreur);
  
  }

      });

}
retour(): void {
  this.router.navigate(['/login']);
}

  get nom() {
    return this.formulaire.get('nom');
  }

  get prenom() {
    return this.formulaire.get('prenom');
  }

  get mail() {
    return this.formulaire.get('mail');
  }

  get motDePasse() {
    return this.formulaire.get('motDePasse');
  }

  get telephone() {
    return this.formulaire.get('telephone');
  }

}
