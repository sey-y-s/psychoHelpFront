import { Component, input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ConseilInfaceModelForPsy } from "../../../../models/citoyenforPsy.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-conseil-card",
  imports: [MatIconModule],
  templateUrl: "./conseil-card.html",
  styleUrl: "./conseil-card.css",
})
export class ConseilCard {
    conseil=input.required<ConseilInfaceModelForPsy>()
    editOnclic=output<number>()
    modifier(id:number){
      this.editOnclic.emit(id)
    }

}
