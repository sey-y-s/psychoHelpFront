import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { PsychologueService } from '../../../core/services/psychologue.service';
import { PsychologueListeDto } from '../../../models/psychologue-liste.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Specialite } from '../../../models/specialite.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-psychologue-list',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './psychologue-list.component.html',
  styleUrl: './psychologue-list.component.css'
})
export class PsychologueListComponent implements OnInit {

  private psychologueService = inject(PsychologueService);

  recherche = signal<string>('');
  specialiteSelectionnee = signal<string>('');

  psychologues = signal<PsychologueListeDto[]>([]);
  specialites = signal<Specialite[]>([]);
  errorMessage = signal<string>('');

  // Liste filtrée
  psychologuesList = computed(() => {

    let liste = this.psychologues();

    const rech = this.recherche().toLowerCase().trim();
    const spec = this.specialiteSelectionnee().toLowerCase().trim();

    if (rech) {
      liste = liste.filter(p =>
        p.nom?.toLowerCase().includes(rech) ||
        p.prenom?.toLowerCase().includes(rech) ||
        p.specialite?.toLowerCase().includes(rech)
      );
    }

    if (spec) {
      liste = liste.filter(p =>
        p.specialite?.toLowerCase() === spec
      );
    }

    return liste;
  });

  // Nombre de résultats
  nombreResultats = computed(() => this.psychologuesList().length);

  ngOnInit(): void {
    this.chargerPsychologues();
    this.chargerSpecialites();
  }

  chargerPsychologues(): void {
    this.psychologueService.getAll().subscribe({
      next: (data) => {
        this.psychologues.set(data);

        if (this.specialites().length === 0) {
          const uniqueSpec: Specialite[] = Array.from(
            new Set(data.map(p => p.specialite).filter((s): s is string => !!s))
          ).map((nom, index) => ({ id: index + 1, nom }));

          this.specialites.set(uniqueSpec);
        }
      },
      error: () => {
        this.errorMessage.set("Erreur lors du chargement des psychologues.");
      }
    });
  }

  chargerSpecialites(): void {
    this.psychologueService.getSpecialites().subscribe({
      next: (specs) => {
        if (specs.length > 0) {
          this.specialites.set(specs);
        }
      },
      error: () => {
        this.errorMessage.set("Erreur lors du chargement des spécialités.");
      }
    });
  }

  reinitialiserRecherche(): void {
    this.recherche.set('');
    this.specialiteSelectionnee.set('');
  }

}