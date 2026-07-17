import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreneauService } from "../../../core/services/creneau.service";
import { SeanceService } from "../../../core/services/seance.service";
import { CreneauInterfaceResponse2 } from "../../../models/creneau.model";
import { seanceInterfaceRequest2 } from "../../../models/seance.model";
import { ActivatedRoute, RouterLink } from "@angular/router";


@Component({
  selector: "app-rdv",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./rdv.html",
  styleUrl: "./rdv.css",
})
export class Rdv implements OnInit {
  private creneauService = inject(CreneauService);
  private seanceService = inject(SeanceService);
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private route=inject(ActivatedRoute)
   psyId!:number
  message: string | null = null;

  // Toutes les disponibilités qui viennent du backend
  creneauDisponiblePourcitoyen: CreneauInterfaceResponse2[] = [];

  // Disponibilités après filtre par date
  creneauDisponiblePourcitoyenfiltre: CreneauInterfaceResponse2[] = [];

  //  si le citoyen a choisi une date
  dateSelectionnee = false;

  // Garde la dernière date choisie
  dateChoisie = "";

  form2 = this.formBuilder.group({
    creneauId: this.formBuilder.control<number | null>(null,Validators.required,),

    dateRdv: this.formBuilder.control<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.chargerDisponibilites();
  }

  chargerDisponibilites() {
           this.psyId=+this.route.snapshot.paramMap.get('id')!
                   console.log(this.psyId)

              this.creneauService.listerDesCreneauxDisponiblePourCitoyen(this.psyId).subscribe({
                    next: (donnees) => {
                      // Stockage de toutes les disponibilités
                      this.creneauDisponiblePourcitoyen = donnees;

                      // Si une date est déjà sélectionnée
                      // on refait le filtre
                      if (this.dateSelectionnee) {
                        this.filtrerParDateComplet(this.dateChoisie);
                      }

                      // Forcer la mise à jour de l'affichage
                      this.cdr.detectChanges();
                    },

                    error: (error) => {
                      console.log(error);
                    },
                  });
        
    
  }

  filtrerParDateComplet(date: string) {
    this.dateSelectionnee = true;

    this.dateChoisie = date;

    this.creneauDisponiblePourcitoyenfiltre =
      this.creneauDisponiblePourcitoyen.filter(
        (creneau) => creneau.date === date,
      );

    this.cdr.detectChanges();
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

          this.message = "Rendez-vous pris avec succès.";

          // Recharger les disponibilités
          // pour retirer le créneau réservé

          this.chargerDisponibilites();

          this.cdr.detectChanges();
        },

        error: ({ error }) => {
          console.log(error);

          this.message = error.message? error.message: "Erreur lors de la prise du rendez-vous";

          this.cdr.detectChanges();
        },
      });
  }
}
