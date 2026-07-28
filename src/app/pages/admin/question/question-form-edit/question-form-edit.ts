import { Component, effect, inject, input, output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { QuestionService } from "../../../../core/services/question.service";
import { questionResponseInterface, questionResponseInterfaceModif } from "../../../../models/question.model";
import { TestService } from "../../../../core/services/test.service";
import { Test } from "../../../../models/tests";

@Component({
  selector: "app-question-form-edit",
  imports: [ReactiveFormsModule],
  templateUrl: "./question-form-edit.html",
  styleUrl: "./question-form-edit.css",
})
export class QuestionFormEdit {
  testService=inject(TestService)
  test=signal<Test[]>([])
  questionService = inject(QuestionService);
  questionEdit=input.required<questionResponseInterfaceModif>()
  editReussiOclik=output<boolean>()
    fermereModalEditOnclik=output<boolean>()
   form = new FormGroup({
    question: new FormControl("", { validators: [Validators.required] }),
    test_id: new FormControl<number|null>(null, { validators: [Validators.required,Validators.maxLength(255)] }),
  });
constructor() {
   this.testService.getTests().subscribe({
            next:(response)=>{
              this.test.set(response)
            },
            error:(error)=>{
              console.log(error)
            }
       })

    effect(() => {

      const question = this.questionEdit();

      this.form.setValue({
        question: question.question,
        test_id: question.test_id
      });

    });

  }
  
   soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
      this.questionService.modifierQuestion(this.questionEdit().id,this.form.value as questionResponseInterfaceModif)
      .subscribe({
        next: (response) => {
          this.editReussiOclik.emit(false)
        },
        error: (error) => {
          console.log(error);
        },
      });
    
    
  }
  annuler(){
                  this.fermereModalEditOnclik.emit(false)

  }
}
