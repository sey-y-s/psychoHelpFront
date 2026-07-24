import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statutConseilPipe",
})
export class StatutConseilPipePipe implements PipeTransform {
  transform(value: string): string {
    if(value=="ENATTENTE"){
         return "En attente"
    }else if(value==="VALIDER"){
      return "Validé"
    }
    else{
      return "Refusé"
    }
   
  }
}
