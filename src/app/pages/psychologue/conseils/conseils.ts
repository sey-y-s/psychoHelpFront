import { HttpClient } from "@angular/common/http";
import { Component, inject, Signal, signal } from "@angular/core";
import { ConseilService } from "../../../core/services/conseil.service";
import { ConseilCard } from "./conseil-card/conseil-card";
import { ConseilForm } from "./conseil-form/conseil-form";
import { ConseilInfaceModelForPsy } from "../../../models/citoyenforPsy.model";
import { erreurInterceptor } from "../../../core/interceptors/erreur.interceptor";
import { ConseilDetail } from "./conseil-detail/conseil-detail";
import { ConseilFormEdit } from "./conseil-form-edit/conseil-form-edit";

@Component({
  selector: "app-conseils",
  imports: [ConseilCard, ConseilForm,ConseilDetail,ConseilFormEdit],
  templateUrl: "./conseils.html",
  styleUrl: "./conseils.css",
})
export class Conseils {
    http=inject(HttpClient);
    conseilService=inject(ConseilService)
    conseils=signal<ConseilInfaceModelForPsy[]>([])
    formulaireVisible=false
    formulaireVisibleforDetail=false
    formulaireVisibleforEdit=false
    conseilRecup=signal<ConseilInfaceModelForPsy|null>(null)
    constructor(){
           this.chargerConseil()
    }
    chargerConseil(){
              this.conseilService.getMesConseils().subscribe(
            {
                 next:(response)=>{
                    this.conseils.set(response)
                 }
            }
           )
    }
    //se declenche lors d'un clique le bouton ajouter
    ouverFermer(){
      this.formulaireVisible=true
    }
    annuler(val:boolean){
      this.formulaireVisible=val
    }
    //cett fonction met à jour la lsite des conseils et ferme le modal
    AjoutEffectuer(){
      this.formulaireVisible=false
      this.chargerConseil()
    }
    //debut de la modification
    modifier(id:number){
      this.formulaireVisibleforEdit=true
      this.conseilService.getConseilById(id).subscribe(
        {
             next:(response)=>{
                  this.conseilRecup.set(response)
             },
             error:(error)=>{
              console.log(error)
             }
        }
      )
    }
    //la suppresion d'un admin
    supprimerConseil(id:number){
          this.conseilService.suprrimer(id).subscribe({
              next:(Response)=>{
                     console.log(Response)
                     //this.chargerConseil()
              },
              error:(error)=>{
                console.log(error)
              },
              complete:()=>{
                   this.chargerConseil()
              }
          })

    }
    //fermer le madal de modification apres l'edit
    FrermerApreEdit(b:boolean){
       this.formulaireVisibleforEdit=b
       this.chargerConseil()
    }
    //detail d'un  conseil
    showDetail(id:number){
          this.formulaireVisibleforDetail=true
          this.conseilService.getConseilById(id).subscribe({
               next:(response)=>{
                  this.conseilRecup.set(response)
               }
          })
    }
    //fermer le modal de description
    fermerModalDescription(b:boolean){
       this.formulaireVisibleforDetail=b
    }

}
