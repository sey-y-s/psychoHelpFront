import { ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PsychologueAdminService } from "../../../core/services/psychologue-admin.service";
import { Psychologue } from "../../../models/psyForAdmin.model";
import { MatIconModule } from "@angular/material/icon";

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
  
  // Modal
  modalOuvert = false;
  psychologueSelectionne: Psychologue | null = null;

  constructor(
    private psychologueAdminService: PsychologueAdminService,
    private cdr: ChangeDetectorRef
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
        this.psysEnAttente = psy.filter(c => c.status == 'ENATTENTE');
        this.psychologuesFiltres = [...this.psysEnAttente];
        this.chargement = false;
        this.cdr.detectChanges();
        
        console.log("Total psychologues:", this.psysListe.length);
        console.log("En attente:", this.psysEnAttente.length);
        console.log("Validés:", this.psysListe.length - this.psysEnAttente.length);
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
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
  validerPsychologue(id: number): void {
    if (confirm('✅ Valider ce psychologue ?')) {
      this.chargement = true;
      this.psychologueAdminService.valider(id).subscribe({
        next: () => {
          alert('✅ Psychologue validé avec succès !');
          this.psyEnAttenteTest();
        },
        error: (err) => {
          console.error('Erreur validation:', err);
          alert('❌ Erreur lors de la validation');
          this.chargement = false;
        }
      });
    }
  }

  /**
   * REFUSER UN PSYCHOLOGUE
   */
  refuserPsychologue(id: number): void {
    const motif = prompt('❌ Motif du refus :');
    if (motif !== null) {
      this.chargement = true;
      this.psychologueAdminService.annuler(id).subscribe({
        next: () => {
          alert('❌ Psychologue refusé');
          this.psyEnAttenteTest();
        },
        error: (err) => {
          console.error('Erreur refus:', err);
          alert('❌ Erreur lors du refus');
          this.chargement = false;
        }
      });
    }
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