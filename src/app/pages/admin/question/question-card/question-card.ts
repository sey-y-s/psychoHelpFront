import { Component, input, output } from "@angular/core";
import { questionResponseInterface } from "../../../../models/question.model";
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
  voirChoix = output<number>();

  afficherChoix = false;

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
    if (this.afficherChoix) {
      this.voirChoix.emit(this.question().id);
    }
  }

  getLettre(index: number): string {
    return String.fromCharCode(65 + index);
  }
}