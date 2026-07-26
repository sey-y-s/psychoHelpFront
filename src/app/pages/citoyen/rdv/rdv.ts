import { ChangeDetectorRef, Component, OnInit, Signal, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreneauService } from "../../../core/services/creneau.service";
import { SeanceService } from "../../../core/services/seance.service";
import { CreneauInterfaceResponse2 } from "../../../models/creneau.model";
import { seanceInterfaceRequest2 } from "../../../models/seance.model";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Filtre } from "./filtre/filtre";
import { NotificationService } from "../../../core/services/notification.service";


@Component({
  selector: "app-rdv",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,Filtre],
  templateUrl: "./rdv.html",
  styleUrl: "./rdv.css",
})
export class Rdv{
  private creneauService = inject(CreneauService);
  private seanceService = inject(SeanceService);
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private route=inject(ActivatedRoute)
   psyId!:number
  message: string | null = null;
  messageSnackBar=inject(NotificationService)
   creneauDisponiblePourcitoyenfiltre=signal<CreneauInterfaceResponse2[]>([]);
  //  si le citoyen a choisi une date
  dateSelectionnee = false;

  form2 = this.formBuilder.group({
    creneauId: this.formBuilder.control<number | null>(null,Validators.required,),

    dateRdv: this.formBuilder.control<string | null>(null, Validators.required),
  });

  constructor() {
    this.chargerDisponibilites("");
  }

  chargerDisponibilites(datepris:string) {
           this.psyId=+this.route.snapshot.paramMap.get('id')!
                   console.log(this.psyId)

              this.creneauService.listerDesCreneauxDisponiblePourCitoyen(this.psyId).subscribe({
                    next: (donnees) => {
                      if(datepris===""){
                                                this.dateSelectionnee=true

                             this.creneauDisponiblePourcitoyenfiltre.set(donnees);
                             console.log(this.creneauDisponiblePourcitoyenfiltre())

                      }else{
                        this.dateSelectionnee=true
                           this.creneauDisponiblePourcitoyenfiltre.set(
                                 donnees.filter((donnee)=>donnee.date===datepris)
                           )
                           //console.log(this.creneauDisponiblePourcitoyenfiltre())
                      }
              
                    },

                    error: (error) => {
                      console.log(error);
                    },
                  });
        
    
  }
  onSubmit2(creneau: CreneauInterfaceResponse2) {
    this.form2.patchValue({
      creneauId: creneau.creneauId,

      dateRdv: creneau.date,
    });

    console.log("Données envoyées :", this.form2.value);

    this.seanceService
      .prendreRdv2(this.form2.value as seanceInterfaceRequest2)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.chargerDisponibilites(creneau.date);
          this.messageSnackBar.succes("rendez vous reservé avec succes!")
        },

        error: ({ error }) => {
          this.messageSnackBar.erreur("Erreur lors de la prise du rendez-vous!")
        },
      });
  }
 
}
