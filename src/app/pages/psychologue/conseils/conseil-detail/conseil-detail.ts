import { Component, input } from "@angular/core";
import { ConseilInfaceModelForPsy } from "../../../../models/citoyenforPsy.model";

@Component({
  selector: "app-conseil-detail",
  imports: [],
  templateUrl: "./conseil-detail.html",
  styleUrl: "./conseil-detail.css",
})
export class ConseilDetail {
  conseil=input.required<ConseilInfaceModelForPsy>()

  retour(){

  }
}
