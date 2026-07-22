import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {RendezVousListe} from "./rendez-vous-liste/rendez-vous-liste";
import {RendezVousDetail} from "./rendez-vous-detail/rendez-vous-detail";
import {RendezVousFiltres} from "./rendez-vous-filtres/rendez-vous-filtres";
import {SeanceService} from "../../../core/services/seance.service";
import {FiltreRendezVous, RendezVous} from "../../../models/rendez-vous.model";
import {finalize} from "rxjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgClass} from "@angular/common";

@Component({
  selector: "app-rendez-vous",
  imports: [MatSnackBarModule, RendezVousListe, RendezVousDetail, RendezVousFiltres, MatIconModule, DatePipe,
    NgClass],
  templateUrl: "./rendez-vous.html",
  styleUrl: "./rendez-vous.css",
})
export class RendezVousComponent implements OnInit {

  private readonly seanceService = inject(SeanceService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly snackBar = inject(MatSnackBar);

  rendezVous: RendezVous[] = [];

  filtreActif: FiltreRendezVous = 'TOUS';

  chargement = false;
  actionEnCours = false;

  rendezVousSelectionne: RendezVous | null = null;

  ngOnInit(): void {
    this.chargerRendezVous();
  }

  heure(valeur: string): string {
    return valeur?.slice(0, 5) ?? '';
  }

  get rendezVousFiltres(): RendezVous[] {
    const aujourdHui = this.obtenirDateLocale();
    switch (this.filtreActif) {
      case 'A_VENIR':
        return this.rendezVous.filter(rdv =>
            (
                rdv.statut === 'RESERVER' ||
                rdv.statut === 'CONFIRMER'
            ) &&
            rdv.dateRdv >= aujourdHui
        );

      case 'AUJOURD_HUI':
        return this.rendezVous.filter(
            rdv => rdv.dateRdv === aujourdHui
        );

      case 'TERMINES':
        return this.rendezVous.filter(
            rdv => rdv.statut === 'TERMINER'
        );

      case 'ANNULES':
        return this.rendezVous.filter(
            rdv => rdv.statut === 'ANNULER'
        );

      default:
        return this.rendezVous;
    }
  }

  changerFiltre(filtre: FiltreRendezVous): void {
    this.filtreActif = filtre;
  }

  afficherDetails(rendezVous: RendezVous): void {
    this.rendezVousSelectionne = rendezVous;
  }

  fermerDetails(): void {
    this.rendezVousSelectionne = null;
  }

  confirmer(rendezVous: RendezVous): void {
    if (
        this.actionEnCours ||
        rendezVous.statut !== 'RESERVER'
    ) {
      return;
    }

    this.actionEnCours = true;
    this.seanceService.confirmer(rendezVous.id).subscribe({
      next: () => {
        this.mettreAJourStatut(
            rendezVous.id,
            'CONFIRMER'
        );
        this.actionEnCours = false;
        this.fermerDetails();

        this.afficherMessage(
            'Rendez-vous confirmé avec succès.'
        );
      },
      error: error => {
        console.error(error);
        this.actionEnCours = false;

        this.afficherMessage(
            this.extraireMessageErreur(
                error,
                'La confirmation du rendez-vous a échoué.'
            )
        );
      }
    });
  }

  annuler(rendezVous: RendezVous): void {
    if (
        this.actionEnCours ||
        rendezVous.statut === 'ANNULER' ||
        rendezVous.statut === 'TERMINER'
    ) {
      return;
    }
    const confirmation = window.confirm(
        `Voulez-vous annuler le rendez-vous de ` +
        `${rendezVous.prenomCitoyen} ${rendezVous.nomCitoyen} ?`
    );
    if (!confirmation) {
      return;
    }
    this.actionEnCours = true;
    this.seanceService.annuler(rendezVous.id).subscribe({
      next: () => {
        this.mettreAJourStatut(
            rendezVous.id,
            'ANNULER'
        );
        this.actionEnCours = false;
        this.fermerDetails();
        this.afficherMessage(
            'Rendez-vous annulé avec succès.'
        );
      },
      error: error => {
        console.error(error);
        this.actionEnCours = false;

        this.afficherMessage(
            this.extraireMessageErreur(
                error,
                'L’annulation du rendez-vous a échoué.'
            )
        );
      }
    });
  }

  // exporter(): void {
  //   this.afficherMessage(
  //       'La fonctionnalité d’export sera ajoutée plus tard.'
  //   );
  // }

  obtenirInitiales(rdv: RendezVous): string {
    const prenom = rdv.prenomCitoyen?.trim().charAt(0) ?? '';
    const nom = rdv.nomCitoyen?.trim().charAt(0) ?? '';
    return `${prenom}${nom}`.toUpperCase();
  }

  private chargerRendezVous(): void {
    this.chargement = true;
    this.seanceService.getMesRendezVous()
        .pipe(
            finalize(() => {
              this.chargement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: (data: RendezVous[]) => {
            this.rendezVous = data ?? [];
          },

          error: error => {
            console.error(
                'Erreur lors du chargement des rendez-vous :',
                error
            );
            this.rendezVous = [];
            this.afficherMessage(
                this.extraireMessageErreur(
                    error,
                    'Impossible de charger les rendez-vous.'
                )
            );
          }
        });
  }

  private mettreAJourStatut(id: number, statut: RendezVous['statut']): void {
    this.rendezVous = this.rendezVous.map(rdv =>
        rdv.id === id
            ? { ...rdv, statut }
            : rdv
    );
  }

  private obtenirDateLocale(): string {
    const date = new Date();
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const jour = String(date.getDate()).padStart(2, '0');
    return `${annee}-${mois}-${jour}`;
  }

  private afficherMessage(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3500,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  private extraireMessageErreur(error: any, messageParDefaut: string): string {
    if (typeof error?.error === 'string' && error.error.trim()) {
      return error.error;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    if (error?.status === 0) {
      return 'Le serveur est inaccessible.';
    }
    if (error?.status === 401 || error?.status === 403) {
      return 'Votre session a expiré ou vous n’êtes pas autorisé.';
    }
    return messageParDefaut;
  }

  dateExport = new Date();
  get libelleFiltreActif(): string {
    switch (this.filtreActif) {
      case 'A_VENIR': return 'À venir';
      case 'AUJOURD_HUI': return 'Aujourd’hui';
      case 'TERMINES': return 'Terminés';
      case 'ANNULES': return 'Annulés';
      default: return 'Tous';
    }
  }

  libelleStatut(statut: string): string {
    switch (statut) {
      case 'RESERVER':
      case 'CONFIRMER':
        return 'À venir';
      case 'TERMINER':
        return 'Terminé';
      case 'ANNULER':
        return 'Annulé';
      default:
        return statut;
    }
  }

  classeStatut(statut: string): string {
    switch (statut) {
      case 'RESERVER':
      case 'CONFIRMER':
        return 'a-venir';
      case 'TERMINER':
        return 'termine';
      case 'ANNULER':
        return 'annule';
      default:
        return '';
    }
  }

  async exporter(): Promise<void> {
    const element = document.getElementById('zone-export-pdf');
    if (!element) {
      console.error('Zone export introuvable');
      return;
    }
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('liste-rendez-vous.pdf');
  }
}
