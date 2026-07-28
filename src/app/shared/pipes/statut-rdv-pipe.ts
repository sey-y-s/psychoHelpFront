import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statutConseilPipe",
})
export class StatutRdvPipe implements PipeTransform {
  transform(value: string): string {
    if(value=="RESERVER"){
         return "Reservé"
    }else if(value==="ANNULER"){
      return "Annulé"
    }
    else{
      return "Refusé"
    }
   
  }
}
