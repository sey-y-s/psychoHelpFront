import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CreneauService} from "../../../core/services/creneau.service";
import {Creneau, CreneauRequest, UpdateCreneauRequest} from "../../../models/creneau.model";
import {CreneauForm} from "./creneau-form/creneau-form";
import {CreneauList} from "./creneau-list/creneau-list";
import {finalize} from "rxjs";

@Component({
  selector: "app-creneaux",
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule, CreneauForm, CreneauList],
  templateUrl: "./creneaux.html",
  styleUrl: "./creneaux.css",
})
export class Creneaux implements OnInit {

  private readonly creneauService = inject(CreneauService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly snackBar = inject(MatSnackBar);

  creneaux: Creneau[] = [];

  chargement = false;
  traitement = false;
  formulaireVisible = false;

  creneauSelectionne: Creneau | null = null;

  ngOnInit(): void {
    this.chargerCreneaux();
  }

  ouvrirAjout(): void {
    this.creneauSelectionne = null;
    this.formulaireVisible = true;
  }

  ouvrirModification(creneau: Creneau): void {
    this.creneauSelectionne = creneau;
    this.formulaireVisible = true;
  }

  fermerFormulaire(): void {
    this.formulaireVisible = false;
    this.creneauSelectionne = null;
  }

  enregistrer(donnees: CreneauRequest | UpdateCreneauRequest): void {
    if (this.creneauSelectionne) {
      this.modifier(this.creneauSelectionne.id, donnees);
    } else {
      this.creer(donnees);
    }
  }

  supprimer(creneau: Creneau): void {
    const confirmation = window.confirm(
        `Supprimer le créneau du ${creneau.jours} de ${creneau.heureDebut} à ${creneau.heureFin} ?`
    );

    if (!confirmation) {
      return;
    }

    this.creneauService.supprimer(creneau.id).subscribe({
      next: () => {
        this.creneaux = this.creneaux.filter(
            element => element.id !== creneau.id
        );

        this.afficherMessage('Créneau supprimé avec succès.');
      },
      error: error => {
        console.error(error);
        this.afficherMessage('La suppression a échoué.');
      }
    });
  }

  private chargerCreneaux(): void {
    this.chargement = true;
    this.creneauService
        .getMesCreneaux()
        .pipe(
            finalize(() => {
              this.chargement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: (data: Creneau[]) => {
            this.creneaux = data ?? [];
          },

          error: error => {
            console.error(
                'Erreur lors du chargement des créneaux :',
                error
            );

            this.creneaux = [];

            this.afficherMessage(
                'Impossible de charger les créneaux.'
            );
          }
        });
  }

  private creer(donnees: CreneauRequest): void {
    this.traitement = true;

    this.creneauService.creer(donnees).subscribe({
      next: creneau => {
        this.creneaux = [...this.creneaux, creneau];
        this.traitement = false;
        this.fermerFormulaire();
        this.afficherMessage('Créneau ajouté avec succès.');
      },
      error: error => {
        console.error(error);
        this.traitement = false;
        this.afficherMessage('La création a échoué.');
      }
    });
  }

  private modifier(
      id: number,
      donnees: CreneauRequest | UpdateCreneauRequest
  ): void {
    this.traitement = true;

    this.creneauService.modifier(id, donnees).subscribe({
      next: creneauModifie => {
        this.creneaux = this.creneaux.map(creneau =>
            creneau.id === id ? creneauModifie : creneau
        );

        this.traitement = false;
        this.fermerFormulaire();
        this.afficherMessage('Créneau modifié avec succès.');
      },
      error: error => {
        console.error(error);
        this.traitement = false;
        this.afficherMessage('La modification a échoué.');
      }
    });
  }

  private afficherMessage(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
