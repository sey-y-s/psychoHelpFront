import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { ConseilService } from "../../../core/services/conseil.service";
import { ConseilCard } from "./conseil-card/conseil-card";
import { ConseilForm } from "./conseil-form/conseil-form";
import { ConseilInfaceModelForPsy } from "../../../models/citoyenforPsy.model";

@Component({
  selector: "app-conseils",
  imports: [ConseilCard, ConseilForm],
  templateUrl: "./conseils.html",
  styleUrl: "./conseils.css",
})
export class Conseils {
    http=inject(HttpClient);
    conseilService=inject(ConseilService)
    conseils=signal<ConseilInfaceModelForPsy[]>([])
    formulaireVisible=false
    conseilId!:number
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
      this.formulaireVisible=true
      this.conseilId=id
       // console.log(id)
    }

}
