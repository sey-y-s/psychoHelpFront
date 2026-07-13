import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreneauService } from "../../core/services/creneau.service";
import { CreneauInterfaceResponse } from "../../models/creneau.model";
import { SeanceService } from "../../core/services/seance.service";
import { seanceInterfaceRequest } from "../../models/seance.model";
import { AuthService } from "../../core/services/auth.service";
import { Utilisateur } from "../../models/utilisateur.model";

@Component({
  selector: "app-rdv",
  imports: [ReactiveFormsModule],
  templateUrl: "./rdv.html",
  styleUrl: "./rdv.css",
})
export class Rdv implements OnInit {
   creneauService=inject(CreneauService)
   seanceService=inject(SeanceService)
   authService=inject(AuthService)
    crenaux : CreneauInterfaceResponse[]=[]
    private formeBulder=inject(FormBuilder)
    message:null|string=null
    private utilisateurConnecter:null|Utilisateur=null
    
    ngOnInit(){

          this.creneauService.listerDesCreneaux()
            .subscribe(donnees => {
              this.crenaux = donnees;
              console.log(this.crenaux)
              
            });
            this.authService.currentUser$.subscribe(
                  utilisateur=>{
                    this.utilisateurConnecter=utilisateur
                  }
              )
       //console.log(this.utilisateurConnecter)
    }
            
    form = this.formeBulder.group({
        citoyenId: this.formeBulder.control<number | null>(null, Validators.required),
        creneauId: this.formeBulder.control<number | null>(null, Validators.required),
        dateRdv: this.formeBulder.control<string | null>(null, Validators.required)
      });
    onSubmit(){
          console.log(this.form.value)
          this.seanceService.prendreRdv(this.form.value as seanceInterfaceRequest).subscribe(
            {
              
              next:  (response)=>{ 
                console.log(response)
                 this.message="rdv pris avec succes!"
              },
              error:({error})=>{ 
                console.log(error) 
                this.message=error.message
                 
              }
            }

          );
    }


}
