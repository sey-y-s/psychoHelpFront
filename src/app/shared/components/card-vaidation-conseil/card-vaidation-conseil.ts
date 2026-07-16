import {Component, Input} from "@angular/core";
import {Conseil} from "../../../models/conseil.model";

@Component({
  selector: "app-card-vaidation-conseil",
  imports: [],
  standalone: true,
  templateUrl: "./card-vaidation-conseil.html",
  styleUrl: "./card-vaidation-conseil.css",
})
export class CardVaidationConseil {

  @Input() donnees!: Conseil;
}
