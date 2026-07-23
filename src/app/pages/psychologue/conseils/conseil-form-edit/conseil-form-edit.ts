import { Component, effect, inject, input, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConseilService } from "../../../../core/services/conseil.service";
import { ConseilInfaceModelForPsy, ConseilInfaceModelForPsyRequest } from "../../../../models/citoyenforPsy.model";

@Component({
  selector: "app-conseil-form-edit",
  imports: [ReactiveFormsModule],
  templateUrl: "./conseil-form-edit.html",
  styleUrl: "./conseil-form-edit.css",
})
export class ConseilFormEdit {
  conseilService = inject(ConseilService);
  conseilEdit=input.required<ConseilInfaceModelForPsy>()
  editReussiOclik=output<boolean>()



   form = new FormGroup({
    titre: new FormControl("", { validators: [Validators.required] }),
    description: new FormControl("", { validators: [Validators.required] }),
  });
constructor() {

    effect(() => {

      const conseil = this.conseilEdit();

      this.form.setValue({
        titre: conseil.titre,
        description: conseil.description
      });

    });

  }
  
   soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
      this.conseilService.modifier(this.conseilEdit().id,this.form.value as ConseilInfaceModelForPsyRequest)
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
                  this.editReussiOclik.emit(false)

  }
}
