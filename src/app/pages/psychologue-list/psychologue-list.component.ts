import { Component, OnInit, inject, signal } from '@angular/core';
import { PsychologueService } from '../../core/services/psychologue.service';
import { PsychologueListeDto } from '../../models/psychologue-liste.model';

@Component({
  selector: 'app-psychologue-list',

  standalone: true,
  templateUrl: './psychologue-list.component.html'
})
export class PsychologueListComponent implements OnInit {
  private psychologueService = inject(PsychologueService);

  psychologues = signal<PsychologueListeDto[]>([]);
  errorMessage = signal<string>('');


  ngOnInit(): void {
    this.psychologueService.getAll().subscribe({
      next: (data) => {
        console.log('Données reçues :', data); // Affiche les données proprement
        this.psychologues.set(data);            // Met à jour le signal
      },
      error: (err) => {
        console.error('Erreur :', err);         // Affiche l'erreur en console
        this.errorMessage.set("Erreur lors du chargement des psychologues.");
      }
    });
  }
}