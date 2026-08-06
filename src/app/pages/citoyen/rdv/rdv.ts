import {
    ChangeDetectorRef,
    Component,
    OnInit,
    Signal,
    inject,
    signal, OnDestroy,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreneauService } from "../../../core/services/creneau.service";
import { SeanceService } from "../../../core/services/seance.service";
import { CreneauInterfaceResponse2 } from "../../../models/creneau.model";
import { seanceInterfaceRequest2 } from "../../../models/seance.model";
import { ActivatedRoute } from "@angular/router";
import { Filtre } from "./filtre/filtre";
import { NotificationService } from "../../../core/services/notification.service";
import { DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-rdv",
  standalone: true,
  imports: [ReactiveFormsModule, Filtre,DatePipe,MatIconModule],
  templateUrl: "./rdv.html",
  styleUrl: "./rdv.css",
})
export class Rdv implements OnDestroy{
  private creneauService = inject(CreneauService);
  private seanceService = inject(SeanceService);
  private formBuilder = inject(FormBuilder);
    private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  psyId!: number;
  message: string | null = null;
  messageSnackBar = inject(NotificationService);
  creneauDisponiblePourcitoyenfiltre = signal<CreneauInterfaceResponse2[]>([]);
    private tousLesCreneaux: CreneauInterfaceResponse2[] = [];
    private intervalId: ReturnType<typeof setInterval> | null = null;
  aujourdHui = new Date().toISOString().split("T")[0];
  dateSelectionnee = signal(
    this.aujourdHui
  );

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

  form2 = this.formBuilder.group({
    creneauId: this.formBuilder.control<number | null>(
      null,
      Validators.required,
    ),

    dateRdv: this.formBuilder.control<string | null>(null, Validators.required),
  });

  constructor() {
      this.demarrerMiseAJourAutomatique();
    console.log(this.aujourdHui);
    this.chargerDisponibilites(this.aujourdHui);
  }

    chargerDisponibilites(datepris: string) {
        this.dateSelectionnee.set(datepris);
        this.psyId = +this.route.snapshot.paramMap.get("id")!;

        this.creneauService
            .listerDesCreneauxDisponiblePourCitoyen(this.psyId)
            .subscribe({
                next: (donnees) => {
                    this.tousLesCreneaux = donnees;
                    this.appliquerFiltreEtMasquage();
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

  // chargerDisponibilites(datepris: string) {
  //     this.dateSelectionnee.set(datepris);
  //
  //   this.psyId = +this.route.snapshot.paramMap.get("id")!;
  //   console.log(this.psyId);
  //
  //   this.creneauService
  //     .listerDesCreneauxDisponiblePourCitoyen(this.psyId)
  //     .subscribe({
  //       next: (donnees) => {
  //         if (datepris === this.aujourdHui) {
  //           this.creneauDisponiblePourcitoyenfiltre.set(
  //             donnees.filter((donnee) => donnee.date === this.aujourdHui),
  //           );
  //         } else {
  //           this.creneauDisponiblePourcitoyenfiltre.set(
  //             donnees.filter((donnee) => donnee.date === datepris),
  //           );
  //           //console.log(this.creneauDisponiblePourcitoyenfiltre())
  //         }
  //       },
  //
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     });
  // }

    private demarrerMiseAJourAutomatique(): void {
        this.intervalId = setInterval(() => {
            this.appliquerFiltreEtMasquage();
            this.cdr.detectChanges();
        }, 10000);
    }

    private appliquerFiltreEtMasquage(): void {
        const dateChoisie = this.dateSelectionnee();
        let creneaux = this.tousLesCreneaux;
        if (dateChoisie) {
            creneaux = creneaux.filter((donnee) => donnee.date === dateChoisie);
        }
        creneaux = creneaux.filter((creneau) => !this.estCreneauPasse(creneau));
        this.creneauDisponiblePourcitoyenfiltre.set(creneaux);
    }

    private estCreneauPasse(creneau: CreneauInterfaceResponse2): boolean {
        const finCreneau = new Date(`${creneau.date}T${creneau.heureFin}`);
        return finCreneau.getTime() <= Date.now();
    }

  onSubmit2(creneau: CreneauInterfaceResponse2) {
    if(confirm("voulez-vous vraiment prendre ce rendez vous ?")){
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
          this.messageSnackBar.succes("rendez vous reservé avec succes!");
        },

        error: ({ error }) => {
            this.messageSnackBar.erreur(error?.message || "Ce créneau n'est plus disponible."
            );
        },
      })

    }
    
  }
}
