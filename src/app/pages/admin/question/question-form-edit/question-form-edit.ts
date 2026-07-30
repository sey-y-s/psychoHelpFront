import { Component, effect, inject, input, output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { QuestionService } from "../../../../core/services/question.service";
import { questionResponseInterfaceModif, questionRequestInterface, choixRequestInterface, choixResponseInterface } from "../../../../models/question.model";
import { TestService } from "../../../../core/services/test.service";
import { Test } from "../../../../models/tests";

@Component({
  selector: "app-question-form-edit",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./question-form-edit.html",
  styleUrl: "./question-form-edit.css",
})
export class QuestionFormEdit {
  testService = inject(TestService);
  test = signal<Test[]>([]);
  questionService = inject(QuestionService);
  questionEdit = input.required<questionResponseInterfaceModif>();
  editReussiOclik = output<boolean>();
  fermereModalEditOnclik = output<boolean>();

  choixList: choixRequestInterface[] = [];
  typeQuestion: 'CHOIX_UNIQUE' | 'CHOIX_MULTIPLE' | 'TEXTE' = 'CHOIX_UNIQUE';

  choixForm = new FormGroup({
    choix: new FormControl("", [Validators.required, Validators.minLength(1)]),
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
      choix: this.choixForm.value.choix!,
      score: this.choixForm.value.score || 0
    };

    const existe = this.choixList.some(c => 
      c.choix.toLowerCase() === nouveauChoix.choix.toLowerCase()
    );

    if (existe) {
      alert('Ce choix existe déjà !');
      return;
    }

    this.choixList.push(nouveauChoix);
    this.choixForm.reset({ score: 0 });
  }

  supprimerChoix(index: number): void {
    if (confirm('Supprimer ce choix ?')) {
      this.choixList.splice(index, 1);
    }
  }

  modifierChoix(index: number): void {
    const choix = this.choixList[index];
    this.choixForm.patchValue({
      choix: choix.choix,
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

  chargerChoixExistants(questionId: number): void {
    this.questionService.getChoixByQuestion(questionId).subscribe({
        next: (choix) => {
            this.choixList = choix.map(c => ({
                choix: c.choix,
                score: c.score
            }));
        },
        error: (error) => {
            console.log('Erreur chargement des choix:', error);
        }
    });
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

    const questionId = this.questionEdit().id;

    // 1. Modifier la question
    const questionData = {
      question: this.form.value.question!,
      test_id: this.form.value.test_id!
    };

    this.questionService.modifierQuestion(questionId, questionData).subscribe({
      next: (response) => {
        // 2. Supprimer les anciens choix
        this.questionService.supprimerTousChoix(questionId).then(() => {
          // 3. Ajouter les nouveaux choix
          if (this.choixList.length > 0) {
            let completed = 0;
            this.choixList.forEach(choix => {
              this.questionService.ajouterChoix(questionId, choix).subscribe({
                next: () => {
                  completed++;
                  if (completed === this.choixList.length) {
                    this.editReussiOclik.emit(false);
                  }
                },
                error: (err) => {
                  console.error('Erreur ajout choix:', err);
                  alert('Erreur lors de l\'ajout des choix');
                }
              });
            });
          } else {
            this.editReussiOclik.emit(false);
          }
        }).catch((err) => {
          console.error('Erreur suppression anciens choix:', err);
          alert('Erreur lors de la suppression des anciens choix');
        });
      },
      error: (error) => {
        console.log(error);
        alert('Erreur lors de la modification');
      }
    });
  }

  annuler() {
    if (this.choixList.length > 0 && !confirm('Les modifications non enregistrées seront perdues. Continuer ?')) {
      return;
    }
    this.fermereModalEditOnclik.emit(false);
  }

  constructor() {
    this.testService.getTests().subscribe({
      next: (response) => {
        this.test.set(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

    effect(() => {
      const question = this.questionEdit();
      if (question) {
        this.form.patchValue({
          question: question.question,
          test_id: question.test_id ?? null,
          type_question: "CHOIX_UNIQUE"
        });
        this.chargerChoixExistants(question.id);
      }
    });
  }
}