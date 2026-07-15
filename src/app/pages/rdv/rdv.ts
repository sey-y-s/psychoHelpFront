import { ChangeDetectorRef, Component, inject, OnInit, } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreneauService } from "../../core/services/creneau.service";
import { CreneauInterfaceResponse, CreneauInterfaceResponse2 } from "../../models/creneau.model";
import { SeanceService } from "../../core/services/seance.service";
import { AuthService } from "../../core/services/auth.service";
import { Utilisateur } from "../../models/utilisateur.model";
import { seanceInterfaceRequest2 } from "../../models/seance.model";



@Component({
  selector: "app-rdv",
  imports: [ReactiveFormsModule],
  templateUrl: "./rdv.html",
  styleUrl: "./rdv.css",
})
export class Rdv implements OnInit {
  cdr = inject(ChangeDetectorRef);
  creneauService = inject(CreneauService)
  seanceService = inject(SeanceService)
  authService = inject(AuthService)
  crenaux: CreneauInterfaceResponse[] = []
  creneauDisponiblePourcitoyen: CreneauInterfaceResponse2[] = []
  creneauDisponiblePourcitoyenfiltre: CreneauInterfaceResponse2[] = []

  private formeBulder = inject(FormBuilder)
  message: null | string = null
  utilisateurConnecter: null | Utilisateur = null

  ngOnInit() {
    this.creneauService.listerDesCreneauxDisponiblePourCitoyen().subscribe({
      next: (donnees) => {
        this.creneauDisponiblePourcitoyen = donnees
        this.cdr.detectChanges();

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  form2 = this.formeBulder.group({
    //citoyenId: this.formeBulder.control<number | null>(null, Validators.required),
    creneauId: this.formeBulder.control<number | null>(null, Validators.required),
    dateRdv: this.formeBulder.control<string | null>(null, Validators.required)
  });
  // on  prend le rdv ici
  onSubmit2(creneau: any,datepourFiltre:any) {
    this.form2.patchValue({
      //citoyenId: this.utilisateurConnecter.id,
      creneauId: creneau.creneauId,
      dateRdv: creneau.date
    });
    console.log(this.form2.value);
    this.seanceService.prendreRdv2(
      this.form2.value as seanceInterfaceRequest2
    ).subscribe({
      next: (response) => {
        this.creneauDisponiblePourcitoyenfiltre=this.creneauDisponiblePourcitoyenfiltre.filter((donnee)=>donnee.date!=datepourFiltre)
        //on enleve les dates qui ont ete prises dans la liste  echec
        this.creneauService.listerDesCreneauxDisponiblePourCitoyen().subscribe({
          next: (donnees) => {
            this.creneauDisponiblePourcitoyen = donnees
            this.cdr.detectChanges();

          },
          error: (error) => {
            console.log(error)
          }
        })
        console.log(response);
        this.message = "rdv pris avec succes!";

      },

      error: ({ error }) => {
        console.log(error);
        this.message = error.message;
      }

    });

  }
  filtrerParDateComplet(date: string) {
    console.log(date)
    this.creneauService.listerDesCreneauxDisponiblePourCitoyen().subscribe(
      {
        next: (donnees) => {

          this.creneauDisponiblePourcitoyenfiltre = this.creneauDisponiblePourcitoyen.filter(
            (creneau) => creneau.date == date
          )
          console.log(this.creneauDisponiblePourcitoyenfiltre)
          this.cdr.detectChanges();


        },
        error: (error) => {

        }
      }
    )



  }

}


