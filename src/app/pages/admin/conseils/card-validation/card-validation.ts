import {Component, Input} from "@angular/core";
import {Conseil} from "../../../../models/conseil.model";

@Component({
  selector: "app-card-validation-conseil",
  imports: [],
  standalone: true,
  templateUrl: "./card-validation.html",
  styleUrl: "./card-validation.css",
})
export class CardValidationConseil {

  @Input() donnees!: Conseil;
}