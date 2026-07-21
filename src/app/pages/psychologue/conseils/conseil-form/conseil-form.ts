import { Component, effect, inject, input, output, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ConseilService } from "../../../../core/services/conseil.service";
import { ConseilInfaceModelForPsyRequest } from "../../../../models/citoyenforPsy.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-conseil-form",
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: "./conseil-form.html",
  styleUrl: "./conseil-form.css",
})
export class ConseilForm {
  conseilService = inject(ConseilService);
  router = inject(Router);

  fermerClic = output<boolean>();
  ajoutReussiMisAjourClic = output<void>();
  conseilId=input.required<number>()
  annuler() {
    this.fermerClic.emit(false);
  }
  form = new FormGroup({
    titre: new FormControl("", { validators: [Validators.required] }),
    description: new FormControl("", { validators: [Validators.required] }),
  });

 
  constructor(){
            effect(()=>{
              
              if(this.conseilId()){
                    this.conseilService.getConseilById(this.conseilId()).subscribe({
                         next:(response)=>{
                            this.form.setValue({
                                titre:response.titre,
                                description:response.description
                            })
                         }
                    })   
              }
            })
  }
   soumission() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    if(this.conseilId()){
        this.conseilService.modifier(this.conseilId(),this.form.value as ConseilInfaceModelForPsyRequest).subscribe(
          {
               next: (response) => {
                      this.ajoutReussiMisAjourClic.emit();

                     console.log(response)
                },
                error: (error) => {
                     console.log(error);
                },
                complete:()=>{
                  this.conseilId.toString
                  this.form.reset()
                }
          }
        )

    }else{

      this.conseilService.ajouterConseil(this.form.value as ConseilInfaceModelForPsyRequest)
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
    
  }
}
