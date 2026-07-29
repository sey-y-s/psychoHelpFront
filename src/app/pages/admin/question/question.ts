import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { QuestionService } from "../../../core/services/question.service";
import { questionResponseInterface, questionResponseInterfaceModif } from "../../../models/question.model";
import { NotificationService } from "../../../core/services/notification.service";
import { BarreRecherche } from "./barre-recherche/barre-recherche";
import { QuestionCard } from "./question-card/question-card";
import { QuestionForm } from "./question-form/question-form";
import { QuestionFormEdit } from "./question-form-edit/question-form-edit";
import { ActivatedRoute } from "@angular/router";

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
    public routerActivate=inject(ActivatedRoute)
    public test_id:number
    constructor(){
           this.test_id=+this.routerActivate.snapshot.paramMap.get('test_id')!
           console.log(this.test_id)
           this.chargerQuestion(this.test_id,"")
    }
    chargerQuestion(test_id:number,question:string){
              this.questionService.getAllQuestion(test_id).subscribe(
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
    //cett fonction met à jour la lsite des questions et ferme le modal
    AjoutEffectuer(){
      this.formulaireVisible=false
      this.messageSnackBar.succes("question postée avec succes!")
      this.chargerQuestion(this.test_id,"")
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
                         this.chargerQuestion(this.test_id,"")

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
                        this.chargerQuestion(this.test_id,"")

                   this.messageSnackBar.succes("suppression effectuée avec avec succes!")
              }
          })

    }
    //fermer le madal de modification apres l'edit
    fermerApreEdit(b:boolean){
       this.formulaireVisibleforEdit=b
             this.chargerQuestion(this.test_id,"")

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
