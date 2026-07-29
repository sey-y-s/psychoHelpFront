import { ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PsychologueAdminService } from "../../../core/services/psychologue-admin.service";
import { Psychologue } from "../../../models/psyForAdmin.model";
import { MatIconModule } from "@angular/material/icon";
import {NotificationService} from "../../../core/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog} from "../../../shared/dialogs/confirmation-dialog/confirmation-dialog";
import {RefusDialog} from "../../../shared/dialogs/refus-dialog/refus-dialog";

@Component({
  selector: "app-admin-psy-en-attente",
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: "./admin-psy-en-attente.html",
  styleUrl: "./admin-psy-en-attente.css",
})
export class AdminPsyEnAttente {
  psysEnAttente: Psychologue[] = [];
  psysListe: Psychologue[] = [];
  psychologuesFiltres: Psychologue[] = [];
  chargement = false;

  filtreActif: 'TOUS' | 'ENATTENTE' | 'VALIDER' | 'REFUSER' = 'TOUS';
  // Modal
  modalOuvert = false;
  psychologueSelectionne: Psychologue | null = null;

  constructor(
    private psychologueAdminService: PsychologueAdminService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.psyEnAttenteTest();
  }

  /**
   * CHARGER LES PSYCHOLOGUES DEPUIS L'API
   */
  psyEnAttenteTest(): void {
    this.chargement = true;
    this.psychologueAdminService.listerEnAttenteTest().subscribe({
      next: (psy: Psychologue[]) => {
        this.psysListe = psy;
        // Filtrer uniquement ceux en attente
        this.psysEnAttente = psy.filter(c => c.status === 'ENATTENTE');
        this.changerFiltre(this.filtreActif);
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.chargement = false;
      }
    });
  }

  /**
   * FILTRER LES PSYCHOLOGUES
   */
  filtrerPsychologues(terme: string): void {
    if (!terme || !terme.trim()) {
      this.psychologuesFiltres = [...this.psysEnAttente];
    } else {
      const search = terme.toLowerCase().trim();
      this.psychologuesFiltres = this.psysEnAttente.filter(p =>
        `${p.prenom} ${p.nom}`.toLowerCase().includes(search) ||
        p.mail.toLowerCase().includes(search) ||
        p.telephone.includes(search) ||
        (p.specialite && p.specialite.toLowerCase().includes(search))
      );
    }
  }

  /**
   * VALIDER UN PSYCHOLOGUE
   */
  validerPsychologue(id:number):void{
    const dialogRef=this.dialog.open(
        ConfirmationDialog,
        {
          width:'420px',
          data:{
            titre:'Validation',
            message:'Voulez-vous vraiment valider ce psychologue ?',
            bouton:'Valider'
          }
        }
    );
    dialogRef.afterClosed().subscribe(result=>{
      if(!result){
        return;
      }
      this.chargement=true;
      this.psychologueAdminService
          .valider(id)
          .subscribe({
            next:()=>{
              this.notificationService.succes(
                  "Psychologue validé avec succès."
              );
              this.psyEnAttenteTest();
            },
            error:()=>{
              this.notificationService.erreur(
                  "Erreur lors de la validation."
              );
              this.chargement=false;
            }
          });
    });

  }

  changerFiltre(filtre: 'TOUS' | 'ENATTENTE' | 'VALIDER' | 'REFUSER') {
    this.filtreActif = filtre;

    switch (filtre) {
      case 'TOUS':
        this.psychologuesFiltres = [...this.psysListe];
        break;

      case 'ENATTENTE':
        this.psychologuesFiltres = this.psysListe.filter(p => p.status === 'ENATTENTE');
        break;

      case 'VALIDER':
        this.psychologuesFiltres = this.psysListe.filter(p => p.status === 'VALIDER');
        break;

      case 'REFUSER':
        this.psychologuesFiltres = this.psysListe.filter(p => p.status === 'REFUSER');
        break;
    }
  }

  /**
   * REFUSER UN PSYCHOLOGUE
   */
  refuserPsychologue(id:number):void{
    const dialogRef=this.dialog.open(RefusDialog);
    dialogRef.afterClosed().subscribe(motif=>{
      if(!motif){
        return;
      }
      this.chargement=true;
      this.psychologueAdminService
          .annuler(id,motif)
          .subscribe({
            next:()=>{
              this.notificationService.info(
                  "Le psychologue a été refusé."
              );
              this.psyEnAttenteTest();
            },
            error:()=>{
              this.notificationService.erreur(
                  "Erreur lors du refus."
              );
              this.chargement=false;
            }
          });
    });
  }

  /**
   * OUVRIR LE MODAL
   */
  ouvrirModal(psychologue: Psychologue): void {
    this.psychologueSelectionne = psychologue;
    this.modalOuvert = true;
    document.body.style.overflow = 'hidden';
  }

  /**
   * FERMER LE MODAL
   */
  fermerModal(): void {
    this.modalOuvert = false;
    this.psychologueSelectionne = null;
    document.body.style.overflow = 'auto';
  }

  /**
   * OBTENIR LES INITIALES
   */
  getInitiales(psychologue: Psychologue): string {
    const prenom = psychologue.prenom || '';
    const nom = psychologue.nom || '';
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  }

  /**
   * OBTENIR UNE COULEUR POUR L'AVATAR
   */
  getColor(id: number): string {
    const colors = [
      '#2c3e50', '#2980b9', '#27ae60', '#e67e22',
      '#8e44ad', '#16a085', '#d35400', '#c0392b',
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6'
    ];
    return colors[id % colors.length];
  }

  /**
   * FORMATER UNE DATE
   */
  formaterDate(date: string): string {
    if (!date) return 'Non disponible';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return date;
    }
  }
}