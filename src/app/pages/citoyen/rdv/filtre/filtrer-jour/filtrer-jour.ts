import { Component, output } from "@angular/core";

@Component({
  selector: "app-filtrer-jour",
  imports: [],
  templateUrl: "./filtrer-jour.html",
  styleUrl: "./filtrer-jour.css",
})
export class FiltrerJour {
  jours = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ];     
     filterOnClick=output<string>()
     filter(jour:string){
           this.filterOnClick.emit(jour)
     }
}
