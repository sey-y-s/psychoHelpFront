import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-detail-rendezvous",
  imports: [ 
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

  ],
  templateUrl: "./detail-rendezvous.html",
  styleUrl: "./detail-rendezvous.css",
})
export class DetailRendezvous implements OnInit{

   rendezVous: any = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
      private router: Router,
      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log(
      'ID du rendez-vous :',
      id
    );

    this.chargerDetailsRendezVous(id);
  }
  

  chargerDetailsRendezVous(id: number): void {

    this.authService
      .obtenirMesRendezVous()
      .subscribe({

        next: (rendezVous) => {

            console.log(
    'Tous les rendez-vous reçus :',
    rendezVous
  );

  console.log(
    'ID recherché :',
    id
  );

          this.rendezVous =
            rendezVous.find(
              rdv => rdv.id === id
            );

          console.log(
            'Rendez-vous sélectionné :',
            this.rendezVous
          );
          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erreur lors du chargement du rendez-vous :',
            error
          );

        }

      });

      
  }
  
}
