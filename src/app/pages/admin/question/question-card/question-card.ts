import { Component, input, output, signal, inject } from "@angular/core";
import { questionResponseInterface, choixResponseInterface } from "../../../../models/question.model";
import { QuestionService } from "../../../../core/services/question.service";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-question-card",
  imports: [MatIconModule, CommonModule],
  templateUrl: "./question-card.html",
  styleUrl: "./question-card.css",
})
export class QuestionCard {
  question = input.required<questionResponseInterface>();
  editOnclic = output<number>();
  deleteOnclic = output<number>();
  // On garde voirChoix pour informer le parent si besoin, mais on ne l'utilise pas pour le chargement
  voirChoix = output<number>();

  private questionService = inject(QuestionService);

  afficherChoix = false;
  choixList = signal<choixResponseInterface[]>([]);
  loadingChoix = signal(false);

  modifier(id: number) {
    this.editOnclic.emit(id);
  }

  supprimerQuestion(id: number) {
    if (confirm("Voulez-vous supprimer cette question ?")) {
      this.deleteOnclic.emit(id);
    }
  }

  toggleChoix() {
    this.afficherChoix = !this.afficherChoix;
    if (this.afficherChoix && this.choixList().length === 0) {
      this.chargerChoix();
    }
    // Informer le parent (optionnel)
    this.voirChoix.emit(this.question().id);
  }

  chargerChoix() {
    this.loadingChoix.set(true);
    this.questionService.getChoixByQuestion(this.question().id).subscribe({
      next: (choix) => {
        this.choixList.set(choix);
        this.loadingChoix.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement des choix:', error);
        this.loadingChoix.set(false);
      }
    });
  }

  getLettre(index: number): string {
    return String.fromCharCode(65 + index);
  }
}