import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RendezVousCard} from "../rendez-vous-card/rendez-vous-card";
import {RendezVous} from "../../../../models/rendez-vous.model";


@Component({
  selector: "app-rendez-vous-liste",
  imports: [MatProgressSpinnerModule, RendezVousCard],
  templateUrl: "./rendez-vous-liste.html",
  styleUrl: "./rendez-vous-liste.css",
})
export class RendezVousListe implements OnChanges{

  @Input() rendezVous: RendezVous[] = [];
  @Input() chargement = false;

  @Output() voirDetails = new EventEmitter<RendezVous>();

  pageActuelle = 1;
  elementsParPage = 3;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rendezVous']) {
      this.pageActuelle = 1;
    }
  }

  get nombrePages(): number {
    return Math.max(
        1,
        Math.ceil(
            this.rendezVous.length /
            this.elementsParPage
        )
    );
  }

  get pages(): number[] {
    return Array.from(
        { length: this.nombrePages },
        (_, index) => index + 1
    );
  }

  get rendezVousPagines(): RendezVous[] {
    const debut =
        (this.pageActuelle - 1) *
        this.elementsParPage;

    return this.rendezVous.slice(
        debut,
        debut + this.elementsParPage
    );
  }

  changerPage(page: number): void {
    if (
        page < 1 ||
        page > this.nombrePages
    ) {
      return;
    }

    this.pageActuelle = page;
  }
}
