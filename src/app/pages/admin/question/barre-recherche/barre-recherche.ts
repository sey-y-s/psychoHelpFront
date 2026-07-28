import { Component, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-barre-recherche",
  imports: [MatIconModule],
  templateUrl: "./barre-recherche.html",
  styleUrl: "./barre-recherche.css",
})
export class BarreRecherche {
   chercherOnClick=output<string>()
          chercher(question:string){
              this.chercherOnClick.emit(question)
          }
}
