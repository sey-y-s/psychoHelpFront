import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-barre-recherche",
  imports: [MatIconModule,FormsModule],
  templateUrl: "./barre-recherche.html",
  styleUrl: "./barre-recherche.css",
})
export class BarreRecherche {
  chercherOnClick=output<string>()
          chercher(conseilnom:string){
              this.chercherOnClick.emit(conseilnom)
          }
}
