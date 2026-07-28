import { Component, ChangeDetectorRef } from "@angular/core";
import { ConseilCitoyenService } from "../../../core/services/conseil-citoyen.service";
import { Conseil } from "../../../models/conseil.model";
import { CommonModule } from '@angular/common';
import { SlicePipe } from "@angular/common";
import { ConseilListeCitoyen } from "../../../models/conseilListeCitoyen.model";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';




@Component({
  selector: "app-list-conseil-citoyen",
  standalone: true,
  imports: [CommonModule, SlicePipe, FormsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],

  templateUrl: "./list-conseil-citoyen.html",
  styleUrl: "./list-conseil-citoyen.css",
})
export class ListConseilCitoyen {
  constructor(private service: ConseilCitoyenService, private cdr: ChangeDetectorRef, private router: Router,
  ) {

  }
  rechercherText = '';

  conseils: Conseil[] = [];


  ngOnInit(): void {
    this.service.listConseilParStatus("VALIDER").subscribe({
      next: (data) => {

        console.log("Conseils reçus :", data);
        this.conseils = data.map(c => ({
          ...c,
          voirplus: false
        })); this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  show(element: Conseil) {
    this.router.navigate(["/me/conseils/", element.id]);
  }
  get filtrageConseil(): Conseil[] {

    if (!this.rechercherText.trim()) {
      return this.conseils;
    }

    const texte = this.rechercherText.toLowerCase();

    return this.conseils.filter(c =>
      c.titre.toLowerCase().includes(texte) ||
      c.auteur.toLowerCase().includes(texte) ||
      c.description.toLowerCase().includes(texte)
    );

  }


}
