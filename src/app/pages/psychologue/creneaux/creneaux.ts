import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CreneauService} from "../../../core/services/creneau.service";
import {Creneau, CreneauRequest, UpdateCreneauRequest} from "../../../models/creneau.model";
import {CreneauForm} from "./creneau-form/creneau-form";
import {CreneauList} from "./creneau-list/creneau-list";
import {finalize} from "rxjs";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: "app-creneaux",
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, CreneauForm, CreneauList],
  templateUrl: "./creneaux.html",
  styleUrl: "./creneaux.css",
})
export class Creneaux implements OnInit {

  private readonly creneauService = inject(CreneauService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly not = inject(NotificationService)

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
    this.cdr.detectChanges();
  }

  ouvrirModification(creneau: Creneau): void {
    this.creneauSelectionne = { ...creneau };
    this.formulaireVisible = true;
    this.cdr.detectChanges();
  }

  fermerFormulaire(): void {
    this.formulaireVisible = false;
    this.creneauSelectionne = null;
    this.cdr.detectChanges();
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
        `Supprimer le créneau du ${creneau.jours} ` +
        `de ${creneau.heureDebut} à ${creneau.heureFin} ?`
    );
    if (!confirmation) {
      return;
    }
    this.traitement = true;
    this.creneauService.supprimer(creneau.id)
        .pipe(
            finalize(() => {
              this.traitement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: () => {
            this.creneaux = this.creneaux.filter(element => element.id !== creneau.id);
            this.not.succes('Créneau supprimé avec succès.');
          },
          error: error => {
            console.error('Erreur de suppression du créneau :', error);
            this.not.erreur(error?.error?.message || 'La suppression a échoué.');
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
            console.error('Erreur lors du chargement des créneaux :', error);
            this.creneaux = [];
            this.not.erreur('Impossible de charger les créneaux.');
          }
        });
  }

  private creer(donnees: CreneauRequest): void {
    this.traitement = true;
    this.creneauService.creer(donnees)
        .pipe(
            finalize(() => {
              this.traitement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: creneau => {
            this.creneaux = [...this.creneaux, creneau];
            this.fermerFormulaire();
            this.not.succes('Créneau ajouté avec succès.');          },
          error: error => {
            console.error('Erreur de création du créneau :', error);
            switch (error.status) {
              case 409:
                this.not.erreur(error.error.message);
                break;

              case 400:
                this.not.erreur(error.error.message);
                break;

              default:
                this.not.info('Une erreur est survenue. Veuillez réessayer.');
            }
          }
        });
  }

  private modifier(id: number, donnees: CreneauRequest | UpdateCreneauRequest): void {
    this.traitement = true;
    this.creneauService.modifier(id, donnees)
        .pipe(
            finalize(() => {
              this.traitement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: creneauModifie => {
            this.creneaux = this.creneaux.map(creneau =>
                creneau.id === id
                    ? creneauModifie
                    : creneau
            );
            this.fermerFormulaire();
            this.not.succes('Créneau modifié avec succès.');
          },
          error: error => {
            console.error('Erreur de modification du créneau :', error);
            this.not.erreur('La modification a échoué.');
          }
        });
  }
}
