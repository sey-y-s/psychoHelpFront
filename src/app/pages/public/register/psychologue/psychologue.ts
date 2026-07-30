  import { CommonModule } from "@angular/common";
  import { Component } from "@angular/core";
  import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
  import { MatButtonModule } from "@angular/material/button";
  import { MatFormFieldModule } from "@angular/material/form-field";
  import { MatIconModule } from "@angular/material/icon";
  import { MatInputModule } from "@angular/material/input";
  import { AuthService } from "../../../../core/services/auth.service";
  import { Specialite } from '../../../../models/specialite.model';
  import { SpecialiteService } from "../../../../core/services/specialite-service";
  import { Router } from '@angular/router';
  import {NotificationService} from "../../../../core/services/notification.service";

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

  cacheMotDePasse = true;

  formulaire: FormGroup;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private specialiteService: SpecialiteService,
      private notificationService: NotificationService,
      private router: Router

    ) {

      this.formulaire = this.fb.group({
        nom: ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
          ]
        ],
        prenom: ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
          ]
        ],
        mail: ['',
          [
            Validators.required,
            Validators.email
          ]
        ],
        motDePasse: ['',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        telephone: ['',
          [
            Validators.required,
            Validators.pattern(/^0[67][0-9]{8}$/)
          ]
        ],
        description: ['',
          [
            Validators.maxLength(500)
          ]
        ],
        idSpecialite: ['',
          Validators.required
        ]
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
        this.formulaire.markAllAsTouched();
        this.messageErreur =
            'Veuillez remplir correctement tous les champs obligatoires.';
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

      // Création du FormData
      const formData = new FormData();
      formData.append(
          "data",
          new Blob(
              [JSON.stringify(this.formulaire.value)],
              { type: "application/json" }
          )
      );
      formData.append("cv", this.cvFile!);
      formData.append("diplome", this.diplomeFile!);

      this.authService
          .inscrirePsychologue(formData)
          .subscribe({
            next: (reponse) => {
              console.log(reponse);
              this.notificationService.succes(
                  "Votre demande d'inscription a été enregistrée avec succès. Elle est maintenant en attente de validation par un administrateur."
              );
              this.formulaire.reset();
              this.cvFile = null;
              this.diplomeFile = null;
              this.cvFileName = '';
              this.diplomeFileName = '';
              this.cvManquant = false;
              this.diplomeManquant = false;
              this.messageErreur = '';
            },
            error: (err) => {
              let messageErreur = "Erreur lors de l'inscription.";
              if (err.status === 400) {messageErreur = err.error?.message ??
                  "Veuillez vérifier les informations saisies.";
              } else if (err.status === 409) {messageErreur = err.error?.message ??
                    "Cette adresse email ou ce numéro de téléphone est déjà utilisé.";
              } else if (err.status === 500) {messageErreur = err.error?.message ??
                    "Une erreur interne est survenue.";
              } else if (err.status === 0) {messageErreur =
                    "Impossible de contacter le serveur.";
              }
              this.notificationService.erreur(messageErreur);
            }
          });
    }

  cvFile: File | null = null;
  cvFileName: string = '';

  diplomeFile: File | null = null;
  diplomeFileName: string = '';

  // Capture du CV
    onCvSelected(event: any): void {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      if (file.type !== 'application/pdf') {
        this.notificationService.erreur("Le CV doit être au format PDF.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        this.notificationService.erreur("Le CV ne doit pas dépasser 3 Mo.");
        return;
      }
      this.cvFile = file;
      this.cvFileName = file.name;
    }

  // Capture du Diplôme
    onDiplomeSelected(event: any): void {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const typesAutorises = ["application/pdf", "image/png", "image/jpeg"];
      if (!typesAutorises.includes(file.type)) {
        this.notificationService.erreur("Le diplôme doit être un PDF, PNG ou JPG.");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        this.notificationService.erreur("Le diplôme ne doit pas dépasser 3 Mo.");
        return;
      }
      this.diplomeFile = file;
      this.diplomeFileName = file.name;
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

    get description() {
      return this.formulaire.get('description');
    }

    get idSpecialite() {
      return this.formulaire.get('idSpecialite');
    }

  }
