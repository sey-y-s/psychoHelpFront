import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { PsychologueService } from '../../core/services/psychologue.service';
import { PsychologueListeDto } from '../../models/psychologue-liste.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Specialite } from '../../models/specialite.model';

@Component({
  selector: 'app-psychologue-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './psychologue-list.component.html'
})
export class PsychologueListComponent implements OnInit {
  private psychologueService = inject(PsychologueService);

  recherche = signal<string>('');
  specialiteSelectionnee = signal<string>('');


  psychologues = signal<PsychologueListeDto[]>([]);
  specialites = signal<Specialite[]>([]);
  errorMessage = signal<string>('');

  psychologuesList = computed(() => {

    let liste = this.psychologues();
    const rech = this.recherche().toLocaleLowerCase().trim();
    const spec = this.specialiteSelectionnee().trim();

    if (rech) {
      liste = liste.filter(p =>
        p.nom?.toLocaleLowerCase().includes(rech) ||
        p.prenom?.toLocaleLowerCase().includes(rech) ||
        p.specialite?.toLowerCase().includes(rech)

      );
    }

    if (spec) {
      liste = liste.filter(p =>
        p.specialite?.toLocaleLowerCase() === spec
      );
    }


    return liste;





  });


  ngOnInit(): void {
    this.chargerPsychologues();
    this.chargerSpecialites();
  }



  chargerPsychologues(): void {
    this.psychologueService.getAll().subscribe({
      next: (data) => {
        console.log('Données reçues :', data); // Affiche les données proprement
        this.psychologues.set(data);            // Met à jour le signal

        if (this.specialites().length === 0) {
          const uniqueSpec: Specialite[] = Array.from(
            new Set(data.map(p => p.specialite).filter((s): s is string => !!s))
          ).map((nom, index) => ({ id: index + 1, nom }));
          this.specialites.set(uniqueSpec);
        }
      },
      error: (err) => {
        console.error('Erreur :', err);         // Affiche l'erreur en console
        this.errorMessage.set("Erreur lors du chargement des psychologues.");
      }
    });
  }


  chargerSpecialites(): void {
    this.psychologueService.getSpecialites().subscribe(
      {
        next: (specs) => {

          if (specs && specs.length > 0) {
            this.specialites.set(specs);
          }

        },
        error: (err) => {
          console.error('Erreur :', err);         // Affiche l'erreur en console
          this.errorMessage.set("Erreur lors du chargement des psychologues.");
        }
      }
    )
  }


  reinitialiserRecherche(): void {
    this.recherche.set('');
    this.specialiteSelectionnee.set('');
  }
}
