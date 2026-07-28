import { Component, input, output } from "@angular/core";
import { questionResponseInterface } from "../../../../models/question.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-question-card",
  imports: [MatIconModule],
  templateUrl: "./question-card.html",
  styleUrl: "./question-card.css",
})
export class QuestionCard {
  question=input.required<questionResponseInterface>()
    editOnclic=output<number>()
    deleteOnclic=output<number>()
    visaliserOnclic=output<number>()

    modifier(id:number){
      this.editOnclic.emit(id)
    }
    supprimerQuestion(id:number){
           if(confirm("voulez-vous supprimer cette question ?")){
                 this.deleteOnclic.emit(id)
           }
        
           
    }
   

}
