import { Component, output } from "@angular/core";

@Component({
  selector: "app-filtre",
  imports: [],
  templateUrl: "./filtre.html",
  styleUrl: "./filtre.css",
})
export class Filtre {
      dateOnChange=output<string>()

      filtrerParDateComplet(datepris:string){
            this.dateOnChange.emit(datepris)
      }
}
