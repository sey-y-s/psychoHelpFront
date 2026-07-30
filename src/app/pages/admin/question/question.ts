import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { QuestionService } from "../../../core/services/question.service";
import { questionResponseInterface, questionResponseInterfaceModif } from "../../../models/question.model";
import { NotificationService } from "../../../core/services/notification.service";
import { BarreRecherche } from "./barre-recherche/barre-recherche";
import { QuestionCard } from "./question-card/question-card";
import { QuestionForm } from "./question-form/question-form";
import { QuestionFormEdit } from "./question-form-edit/question-form-edit";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-question",
  imports: [BarreRecherche, QuestionCard, QuestionForm, QuestionFormEdit],
  templateUrl: "./question.html",
  styleUrl: "./question.css",
})
export class Question {
  http = inject(HttpClient);
  questionService = inject(QuestionService);
  questionListe = signal<questionResponseInterface[]>([]);
  formulaireVisible = false;
  formulaireVisibleforDetail = false;
  formulaireVisibleforEdit = false;
  questionRecup = signal<questionResponseInterfaceModif | null>(null);
  messageSnackBar = inject(NotificationService);
  public routerActivate = inject(ActivatedRoute);
  public test_id: number;

  constructor() {
    this.test_id = +this.routerActivate.snapshot.paramMap.get('test_id')!;
    console.log(this.test_id);
    this.chargerQuestion(this.test_id, "");
  }

  chargerQuestion(test_id: number, question: string) {
    this.questionService.getAllQuestion(test_id).subscribe({
      next: (response) => {
        if (question === "") {
          console.log("lllflf");
          this.questionListe.set(response);
        } else {
          console.log("diffent");
          this.questionListe.set(
            response.filter((questionOne) =>
              questionOne.question.toLowerCase().includes(question.toLowerCase())
            )
          );
        }
      },
      error: (error) => {
        console.error('Erreur chargement:', error);
        this.messageSnackBar.erreur('Erreur lors du chargement');
      }
    });
  }

  // ============================================================
  // AJOUT
  // ============================================================

  ouverFermer() {
    this.formulaireVisible = true;
  }

  annuler(val: boolean) {
    this.formulaireVisible = val;
  }

  AjoutEffectuer() {
    this.formulaireVisible = false;
    this.messageSnackBar.succes("Question ajoutée avec succès!");
    this.chargerQuestion(this.test_id, "");
  }

  // ============================================================
  // MODIFICATION
  // ============================================================

  modifier(id: number) {
    this.formulaireVisibleforEdit = true;
    this.questionService.getQuestion(id).subscribe({
      next: (response) => {
        this.questionRecup.set(response);
      },
      error: (error) => {
        console.log(error);
        this.messageSnackBar.erreur('Erreur lors du chargement');
      }
    });
  }

  fermerApreEdit(b: boolean) {
    this.formulaireVisibleforEdit = b;
    this.chargerQuestion(this.test_id, "");
    this.messageSnackBar.succes("Modification effectuée avec succès!");
  }

  fermerApreannulerEdit(b: boolean) {
    this.formulaireVisibleforEdit = b;
  }

  // ============================================================
  // SUPPRESSION
  // ============================================================

  supprimerQuestion(id: number) {
    this.questionService.delete(id).subscribe({
      next: (Response) => {
        console.log(Response);
      },
      error: (error) => {
        console.log(error);
        this.messageSnackBar.erreur('Erreur lors de la suppression');
      },
      complete: () => {
        this.chargerQuestion(this.test_id, "");
        this.messageSnackBar.succes("Suppression effectuée avec succès!");
      }
    });
  }

  // ============================================================
  // VOIR LES CHOIX
  // ============================================================

  chargerChoix(questionId: number): void {
    this.questionService.getChoixByQuestion(questionId).subscribe({
      next: (choix) => {
        const questions = this.questionListe();
        const index = questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
          questions[index].choix = choix;
          this.questionListe.set([...questions]);
        }
      },
      error: (error) => {
        console.error('Erreur chargement des choix:', error);
        this.messageSnackBar.erreur('Erreur lors du chargement des choix');
      }
    });
  }

  fermerModalDescription(b: boolean) {
    this.formulaireVisibleforDetail = b;
  }
}