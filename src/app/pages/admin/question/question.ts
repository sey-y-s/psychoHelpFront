import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { QuestionService } from "../../../core/services/question.service";
import { questionResponseInterface, questionResponseInterfaceModif } from "../../../models/question.model";
import { NotificationService } from "../../../core/services/notification.service";
import { BarreRecherche } from "./barre-recherche/barre-recherche";
import { QuestionCard } from "./question-card/question-card";
import { QuestionForm } from "./question-form/question-form";
import { QuestionFormEdit } from "./question-form-edit/question-form-edit";

@Component({
  selector: "app-question",
  imports: [BarreRecherche,QuestionCard,QuestionForm,QuestionFormEdit],
  templateUrl: "./question.html",
  styleUrl: "./question.css",
})
export class Question {
  http=inject(HttpClient);
    questionService=inject(QuestionService)
    questionListe=signal<questionResponseInterface[]>([])
    formulaireVisible=false
    formulaireVisibleforDetail=false
    formulaireVisibleforEdit=false
    questionRecup=signal<questionResponseInterfaceModif|null>(null)
    messageSnackBar=inject(NotificationService)
    constructor(){
           this.chargerQuestion("")
    }
    chargerQuestion(question:string){
              this.questionService.getAllQuestion().subscribe(
            {
                 next:(response)=>{
                    if(question===""){
                      console.log("lllflf")
                         this.questionListe.set(response)

                    }else{
                                            console.log("diffent")

                        this.questionListe.set(response.filter((questionOne)=>questionOne.question.toLowerCase().includes(question.toLowerCase())))

                    }
                    
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
      this.chargerQuestion("")
      this.messageSnackBar.succes("conseil posté avec succes!")
    }
    //debut de la modification
    modifier(id:number){
      this.formulaireVisibleforEdit=true
      this.questionService.getQuestion(id).subscribe(
        {
             next:(response)=>{
                  this.questionRecup.set(response)
             },
             error:(error)=>{
              console.log(error)
             }
             ,
              complete:()=>{
                   this.chargerQuestion("")
              }
        }
      )
    }
    //la suppresion d'un admin
    supprimerConseil(id:number){
          this.questionService.delete(id).subscribe({
              next:(Response)=>{
                     console.log(Response)
                     //this.chargerConseil()
              },
              error:(error)=>{
                console.log(error)
              },
              complete:()=>{
                   this.chargerQuestion("")
                   this.messageSnackBar.succes("suppression effectuée avec avec succes!")
              }
          })

    }
    //fermer le madal de modification apres l'edit
    fermerApreEdit(b:boolean){
       this.formulaireVisibleforEdit=b
       this.chargerQuestion("")
       this.messageSnackBar.succes("modification effectuée avec succes!")

    }
    //fermer le madal de modification apres l'edit
    fermerApreannulerEdit(b:boolean){
       this.formulaireVisibleforEdit=b
      
    }
    
    //fermer le modal de description
    fermerModalDescription(b:boolean){
       this.formulaireVisibleforDetail=b
    }
  
}
