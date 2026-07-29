import { Component, effect, inject, input, output, signal } from "@angular/core";
import { QuestionService } from "../../../../core/services/question.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { questionRequestInterface, choixRequestInterface } from "../../../../models/question.model";
import { TestService } from "../../../../core/services/test.service";
import { Test } from "../../../../models/tests";

@Component({
  selector: "app-question-form",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./question-form.html",
  styleUrl: "./question-form.css",
})
export class QuestionForm {
  questionService = inject(QuestionService);
  router = inject(Router);
  testService = inject(TestService);
  test = signal<Test[]>([]);
  test_id = input<number>();

  fermerClic = output<boolean>();
  ajoutReussiMisAjourClic = output<void>();

  choixList: choixRequestInterface[] = [];
  typeQuestion: 'CHOIX_UNIQUE' | 'CHOIX_MULTIPLE' | 'TEXTE' = 'CHOIX_UNIQUE';

  choixForm = new FormGroup({
    texte: new FormControl("", [Validators.required, Validators.minLength(1)]),
    estCorrect: new FormControl(false),
    score: new FormControl(0, [Validators.min(0), Validators.max(10)])
  });

  form = new FormGroup({
    question: new FormControl("", { validators: [Validators.required] }),
    test_id: new FormControl<number | null>(null, { validators: [Validators.required] }),
    type_question: new FormControl("CHOIX_UNIQUE")
  });

  ajouterChoix(): void {
    if (this.choixForm.invalid) {
      return;
    }

    const nouveauChoix: choixRequestInterface = {
      texte: this.choixForm.value.texte!,
      estCorrect: this.choixForm.value.estCorrect || false,
      score: this.choixForm.value.score || 0
    };

    const existe = this.choixList.some(c => 
      c.texte.toLowerCase() === nouveauChoix.texte.toLowerCase()
    );

    if (existe) {
      alert('Ce choix existe déjà !');
      return;
    }

    this.choixList.push(nouveauChoix);
    this.choixForm.reset({ estCorrect: false, score: 0 });
  }

  supprimerChoix(index: number): void {
    if (confirm('Supprimer ce choix ?')) {
      this.choixList.splice(index, 1);
    }
  }

  modifierChoix(index: number): void {
    const choix = this.choixList[index];
    this.choixForm.patchValue({
      texte: choix.texte,
      estCorrect: choix.estCorrect,
      score: choix.score || 0
    });
    this.choixList.splice(index, 1);
  }

  viderChoix(): void {
    if (this.choixList.length > 0 && confirm('Vider tous les choix ?')) {
      this.choixList = [];
    }
  }

  changerType(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.typeQuestion = select.value as 'CHOIX_UNIQUE' | 'CHOIX_MULTIPLE' | 'TEXTE';
    if (this.typeQuestion === 'TEXTE') {
      this.choixList = [];
    }
  }

  soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.typeQuestion !== 'TEXTE' && this.choixList.length < 2) {
      alert('Ajoutez au moins 2 choix pour cette question');
      return;
    }

    const questionData: questionRequestInterface = {
      test_id: this.form.value.test_id!,
      question: this.form.value.question!,
      choix: this.typeQuestion !== 'TEXTE' ? this.choixList : []
    };

    this.questionService.ajouterQuestion(questionData).subscribe({
      next: (response) => {
        this.ajoutReussiMisAjourClic.emit();
      },
      error: (error) => {
        console.log(error);
        alert('Erreur lors de l\'ajout');
      }
    });
  }

  annuler() {
    if (this.choixList.length > 0 && !confirm('Les choix non enregistrés seront perdus. Continuer ?')) {
      return;
    }
    this.fermerClic.emit(false);
  }

  constructor() {
    effect(() => {
      this.form.patchValue({
        test_id: this.test_id()
      });
    });

    this.testService.getTests().subscribe({
      next: (response) => {
        this.test.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}