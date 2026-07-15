import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Psychologue } from '../../models/psychologue.model';
import { PsychologueAdminService } from '../../core/services/psychologue-admin.service';

@Component({
  selector: 'app-admin-psychologue-validation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-psychologue-validation.component.html',
  styleUrls: ['./admin-psychologue-validation.component.css']
})
export class AdminPsychologueValidationComponent implements OnInit {

  // Liste des psychologues
  psychologues: Psychologue[] = [];
  
  // Liste filtrée pour la recherche
  psychologuesFiltres: Psychologue[] = [];
  
  // État de chargement
  chargement = false;
  
  // Terme de recherche
  termeRecherche = '';
  
  // Pagination
  pageActuelle = 1;
  elementsParPage = 5;
  totalElements = 0;

  // Statistiques
  totalActifs = 0;
  totalEnAttente = 0;
  totalRefuses = 0;

  // Modal
  modalOuvert = false;
  psychologueSelectionne: Psychologue | null = null;

  // Flag pour savoir si c'est le premier chargement
  premierChargement = true;

  constructor(
    private psychologueAdminService: PsychologueAdminService
  ) {}

  ngOnInit(): void {
    // 1. D'abord charger les données mockées INSTANTANÉMENT
    this.chargerDonneesMock();
    
    // 2. Puis charger les données de l'API en arrière-plan
    this.chargerPsychologuesDepuisApi();
  }

  /**
   * CHARGER LES PSYCHOLOGUES DEPUIS L'API (en arrière-plan)
   */
  chargerPsychologuesDepuisApi(): void {
    this.psychologueAdminService.listerEnAttente().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.psychologues = data;
          this.calculerStatistiques();
          this.appliquerFiltre();
        }
        this.premierChargement = false;
      },
      error: (error) => {
        console.error('Erreur API:', error);
        this.premierChargement = false;
        // Si l'API échoue, on garde les données mockées
      }
    });
  }

  /**
   * DONNÉES MOCKÉES POUR LE TEST (chargement INSTANTANÉ)
   */
  chargerDonneesMock(): void {
    this.psychologues = [
      {
        id: 1,
        nom: 'Saybot',
        prenom: 'Noob',
        telephone: '+223 12 34 56 78',
        mail: 'noob.saybot@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-15',
        status: true,
        description: 'Psychologue clinicien spécialisé en thérapie cognitive et comportementale. Diplômé de l\'Université de Bamako avec 10 ans d\'expérience.',
        diplome_path: 'https://example.com/diplome_noob.pdf',
        cv_path: 'https://example.com/cv_noob.pdf',
        etat: true
      },
      {
        id: 2,
        nom: 'Diallo',
        prenom: 'Aminata',
        telephone: '+223 98 76 54 32',
        mail: 'aminata.diallo@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-14',
        status: true,
        description: 'Psychologue pour enfants et adolescents. Spécialisée en gestion des troubles du comportement et de l\'apprentissage.',
        diplome_path: 'https://example.com/diplome_aminata.pdf',
        cv_path: 'https://example.com/cv_aminata.pdf',
        etat: true
      },
      {
        id: 3,
        nom: 'Keita',
        prenom: 'Mamadou',
        telephone: '+223 45 67 89 01',
        mail: 'mamadou.keita@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-13',
        status: true,
        description: 'Psychologue sociale et du travail. Expert en gestion de conflits et en développement organisationnel.',
        diplome_path: 'https://example.com/diplome_mamadou.pdf',
        cv_path: 'https://example.com/cv_mamadou.pdf',
        etat: true
      },
      {
        id: 4,
        nom: 'Traoré',
        prenom: 'Fatoumata',
        telephone: '+223 23 45 67 89',
        mail: 'fatoumata.traore@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-12',
        status: true,
        description: 'Psychologue clinicienne spécialisée en gestion du stress, de l\'anxiété et des troubles émotionnels.',
        diplome_path: 'https://example.com/diplome_fatoumata.pdf',
        cv_path: 'https://example.com/cv_fatoumata.pdf',
        etat: false
      },
      {
        id: 5,
        nom: 'Sow',
        prenom: 'Ousmane',
        telephone: '+223 56 78 90 12',
        mail: 'ousmane.sow@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-11',
        status: true,
        description: 'Psychologue du développement et de l\'éducation. Spécialisé dans l\'accompagnement des enfants et des familles.',
        diplome_path: 'https://example.com/diplome_ousmane.pdf',
        cv_path: 'https://example.com/cv_ousmane.pdf',
        etat: true
      },
      {
        id: 6,
        nom: 'Ndiaye',
        prenom: 'Mariama',
        telephone: '+223 67 89 01 23',
        mail: 'mariama.ndiaye@email.com',
        role: 'PSYCHOLOGUE',
        dateCreation: '2026-07-10',
        status: true,
        description: 'Psychologue cognitive et comportementale. Expérience en thérapie de couple et en gestion des émotions.',
        diplome_path: 'https://example.com/diplome_mariama.pdf',
        cv_path: 'https://example.com/cv_mariama.pdf',
        etat: false
      }
    ];
    
    this.calculerStatistiques();
    this.appliquerFiltre();
  }

  /**
   * CHARGER LES PSYCHOLOGUES (appelé après validation/refus)
   */
  chargerPsychologues(): void {
    this.chargement = true;

    this.psychologueAdminService.listerEnAttente().subscribe({
      next: (data) => {
        this.psychologues = data;
        this.calculerStatistiques();
        this.appliquerFiltre();
        this.chargement = false;
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.chargement = false;
        // Garder les données mockées si l'API échoue
      }
    });
  }

  /**
   * CALCULER LES STATISTIQUES
   */
  calculerStatistiques(): void {
    this.totalActifs = this.psychologues.filter(p => p.status).length;
    this.totalEnAttente = this.psychologues.filter(p => !p.etat).length;
    this.totalRefuses = this.psychologues.filter(p => p.etat === false && p.status === false).length;
    this.totalElements = this.psychologues.length;
  }

  /**
   * APPLIQUER LE FILTRE DE RECHERCHE
   */
  appliquerFiltre(): void {
    if (!this.termeRecherche.trim()) {
      this.psychologuesFiltres = [...this.psychologues];
    } else {
      const terme = this.termeRecherche.toLowerCase().trim();
      this.psychologuesFiltres = this.psychologues.filter(p =>
        `${p.prenom} ${p.nom}`.toLowerCase().includes(terme) ||
        p.telephone.includes(terme) ||
        p.mail.toLowerCase().includes(terme) ||
        p.description.toLowerCase().includes(terme)
      );
    }
    this.totalElements = this.psychologuesFiltres.length;
  }

  /**
   * RECHERCHE EN TEMPS RÉEL
   */
  rechercher(): void {
    this.appliquerFiltre();
    this.pageActuelle = 1;
  }

  /**
   * OBTENIR LES ÉLÉMENTS DE LA PAGE COURANTE
   */
  getElementsPage(): Psychologue[] {
    const debut = (this.pageActuelle - 1) * this.elementsParPage;
    const fin = debut + this.elementsParPage;
    return this.psychologuesFiltres.slice(debut, fin);
  }

  /**
   * CHANGER DE PAGE
   */
  changerPage(page: number): void {
    this.pageActuelle = page;
  }

  /**
   * PAGE PRÉCÉDENTE
   */
  pagePrecedente(): void {
    if (this.pageActuelle > 1) {
      this.pageActuelle--;
    }
  }

  /**
   * PAGE SUIVANTE
   */
  pageSuivante(): void {
    if (this.pageActuelle < this.getTotalPages()) {
      this.pageActuelle++;
    }
  }

  /**
   * OBTENIR LE NOMBRE TOTAL DE PAGES
   */
  getTotalPages(): number {
    return Math.ceil(this.totalElements / this.elementsParPage);
  }

  /**
   * OBTENIR LES NUMÉROS DE PAGES À AFFICHER
   */
  getPages(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  /**
   * VALIDER UN PSYCHOLOGUE
   */
  valider(id: number): void {
    if (confirm('✅ Valider ce psychologue ?')) {
      this.chargement = true;
      this.psychologueAdminService.valider(id).subscribe({
        next: () => {
          alert('✅ Psychologue validé avec succès !');
          this.chargerPsychologues();
          this.chargement = false;
        },
        error: () => {
          alert('❌ Erreur lors de la validation');
          this.chargement = false;
        }
      });
    }
  }

  /**
   * REFUSER/ANNULER UN PSYCHOLOGUE
   */
  refuser(id: number): void {
    const motif = prompt('❌ Motif du refus :');
    if (motif !== null) {
      this.chargement = true;
      this.psychologueAdminService.annuler(id).subscribe({
        next: () => {
          alert('❌ Psychologue refusé');
          this.chargerPsychologues();
          this.chargement = false;
        },
        error: () => {
          alert('❌ Erreur lors du refus');
          this.chargement = false;
        }
      });
    }
  }

  /**
   * ACTIVER/DÉSACTIVER UN COMPTE
   */
  toggleStatus(psychologue: Psychologue): void {
    const action = psychologue.status ? 'désactiver' : 'activer';
    if (confirm(`⚠️ Voulez-vous ${action} le compte de ${psychologue.prenom} ${psychologue.nom} ?`)) {
      psychologue.status = !psychologue.status;
      this.calculerStatistiques();
      this.appliquerFiltre();
    }
  }

  /**
   * OUVRIR LE MODAL AVEC LES DÉTAILS DU PSYCHOLOGUE
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
   * OBTENIR LA CLASSE CSS POUR LE STATUT
   */
  getStatusClass(status: boolean): string {
    return status ? 'status-active' : 'status-inactive';
  }

  /**
   * OBTENIR LE TEXTE DU STATUT
   */
  getStatusText(status: boolean): string {
    return status ? 'Activé' : 'Désactivé';
  }

  /**
   * OBTENIR LA CLASSE CSS POUR L'ÉTAT
   */
  getEtatClass(etat: boolean): string {
    if (etat === true) return 'etat-valide';
    return 'etat-attente';
  }

  /**
   * OBTENIR LE TEXTE DE L'ÉTAT
   */
  getEtatText(etat: boolean): string {
    if (etat === true) return 'Validé';
    return 'En attente';
  }

  /**
   * OBTENIR LA PREMIÈRE LETTRE DU NOM POUR L'AVATAR
   */
  getInitiales(psychologue: Psychologue): string {
    return `${psychologue.prenom.charAt(0)}${psychologue.nom.charAt(0)}`;
  }

  /**
   * OBTENIR UNE COULEUR POUR L'AVATAR
   */
  getColor(id: number): string {
    const colors = [
      '#2c3e50', '#2980b9', '#27ae60', '#e67e22', 
      '#8e44ad', '#16a085', '#d35400', '#c0392b',
      '#2c3e50', '#2980b9', '#27ae60', '#e67e22'
    ];
    return colors[id % colors.length];
  }

  /**
   * FORMATER UNE DATE
   */
  formaterDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
  }
  
}
