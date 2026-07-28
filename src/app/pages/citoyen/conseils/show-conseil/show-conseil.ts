import { Component, ChangeDetectorRef } from "@angular/core";
import { ConseilCitoyenService } from "../../../../core/services/conseil-citoyen.service";
import { Conseil } from "../../../../models/conseil.model";
import { RouterModule, Router, ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";




@Component({
  selector: "app-show-conseil",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./show-conseil.html",
  styleUrl: "./show-conseil.css",
})
export class ShowConseil {
  constructor(private route: ActivatedRoute, private conseilService: ConseilCitoyenService, private cdr: ChangeDetectorRef,) {

  }
  conseil!: Conseil;
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.conseilService.conseilById(id).subscribe({
      next: data => {
        this.conseil = data
        this.cdr.detectChanges();
        console.log(data);
      }


    })


  }
}
