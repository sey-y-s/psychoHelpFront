import { Component, inject, output, signal } from "@angular/core";
import { QuestionService } from "../../../../core/services/question.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { questionRequestInterface } from "../../../../models/question.model";
import { TestService } from "../../../../core/services/test.service";
import { Test } from "../../../../models/tests";

@Component({
  selector: "app-question-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./question-form.html",
  styleUrl: "./question-form.css",
})
export class QuestionForm {
  questionService = inject(QuestionService);
  router = inject(Router);
  testService=inject(TestService)
  test=signal<Test[]>([])

  fermerClic = output<boolean>();
  ajoutReussiMisAjourClic = output<void>();
  annuler() {
    this.fermerClic.emit(false);
  }
  form = new FormGroup({
    question: new FormControl("", { validators: [Validators.required] }),
    test_id: new FormControl<number | null>(null, {validators: [Validators.required]})
  });

   soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
      this.questionService.ajouterQuestion(this.form.value as questionRequestInterface)
      .subscribe({
        next: (response) => {
          //met à jour la liste des conseils
          this.ajoutReussiMisAjourClic.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    
    
  }
  constructor(){
       this.testService.getTests().subscribe({
            next:(response)=>{
              this.test.set(response)
            },
            error:(error)=>{
              console.log(error)
            }
       })
  }
}
