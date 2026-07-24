import { Component, input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ConseilInfaceModelForPsy } from "../../../../models/citoyenforPsy.model";
import { RouterLink } from "@angular/router";
import { DatePipe } from "@angular/common";
import { StatutConseilPipePipe } from "../../../../shared/components/pipes/statut-conseil-pipe-pipe";

@Component({
  selector: "app-conseil-card",
  imports: [MatIconModule,DatePipe,StatutConseilPipePipe],
  templateUrl: "./conseil-card.html",
  styleUrl: "./conseil-card.css",
})
export class ConseilCard {
    conseil=input.required<ConseilInfaceModelForPsy>()
    editOnclic=output<number>()
    deleteOnclic=output<number>()
    visaliserOnclic=output<number>()

    modifier(id:number){
      this.editOnclic.emit(id)
    }
    supprimerConseil(id:number){
           if(confirm("voulez-vous supprimer ce conseil")){
                 this.deleteOnclic.emit(id)
           }
        
           
    }
    visualiser(id:number){
         this.visaliserOnclic.emit(id)
    }

}
