import { Component, ChangeDetectorRef } from "@angular/core";
import { ConseilCitoyenService } from "../../core/services/conseil-citoyen.service";
import { Conseil } from "../../models/conseil.model";
import { CommonModule } from '@angular/common';
import { SlicePipe } from "@angular/common";
import { ConseilListeCitoyen } from "../../models/conseilListeCitoyen.model"; 
import { RouterModule, Router, ActivatedRoute } from "@angular/router";



@Component({
  selector: "app-list-conseil-citoyen",
  standalone: true,
  imports: [CommonModule,SlicePipe],

  templateUrl: "./list-conseil-citoyen.html",
  styleUrl: "./list-conseil-citoyen.css",
})
export class ListConseilCitoyen {
  constructor(private service: ConseilCitoyenService, private cdr: ChangeDetectorRef,    private router: Router,
) {
    
  }
    conseils:Conseil[] = [];
  
  
  ngOnInit(): void {
    this.service.listConseilParStatus("VALIDER").subscribe({
      next: (data) => {
              console.log("Conseils reçus :", data);
this.conseils = data.map(c => ({
  ...c,
  voirplus: false
}));        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  show(element:Conseil){
    this.router.navigate(["/conseils/show",element.id]);
  }
}
