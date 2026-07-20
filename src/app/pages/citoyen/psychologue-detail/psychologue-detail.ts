import { Component, OnInit, ChangeDetectorRef } from "@angular/core"; // Ajout de ChangeDetectorRef
import { PsychologueService } from "../../../core/services/psychologue.service";
import { Psychologue } from "../../../models/psychologue.model";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { switchMap, catchError, of } from "rxjs";

@Component({
  selector: "app-psychologue-detail",
  imports: [
    RouterLink
  ], 
  templateUrl: "./psychologue-detail.html",
  styleUrl: "./psychologue-detail.css",
})
export class PsychologueDetail implements OnInit {
  psychologue?: Psychologue | null = null;
  urlImage = "";

  constructor(
    private route: ActivatedRoute,
    private psychologueService: PsychologueService,
    // Injection ici
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log("ID détecté par la route :", id);
        
        if (!id || isNaN(Number(id))) {
          return of(null); 
        }

        return this.psychologueService.trouverParId(Number(id)).pipe(
          catchError(err => {
            console.error("Erreur API sur l'ID :", id, err);
            return of(null); 
          })
        );
      })
    ).subscribe({
      next: (res) => {
        console.log("Données reçues dans subscribe :", JSON.stringify(res, null, 2));
        
        if (res && res.id !== undefined && res.id !== null) {
          this.psychologue = res;
          this.urlImage = "https://api.dicebear.com/10.x/initials/svg?seed="
       + this.psychologue?.prenom  + " "+ this.psychologue?.nom;

       this.cdr.detectChanges(); 
        } else {
          console.log("Résultat vide ou erroné -> Mode Introuvable activé");
          this.handleNotFound();
        }
      },
    
    });
  }

  handleNotFound() {
    this.psychologue = null;
    this.urlImage = "";
    // Force la mise à jour si on passe à l'état introuvable
    this.cdr.detectChanges(); 
  }
}

  // ngOnInit() {
  //   this.route.paramMap.pipe(
  //     switchMap(params => {
  //       const id = params.get('id');
  //       console.log("ID récupéré :", id);
        
  //       if (!id || isNaN(Number(id))) {
  //         return of(null); 
  //       }

  //       return this.psychologueService.trouverParId(Number(id)).pipe(
  //         catchError(err => {
  //           console.error("Erreur API interceptée :", err);
  //           return of(null); 
  //         })
  //       );
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       console.log("Données reçues dans subscribe :", JSON.stringify(res, null, 2));
        
  //       if (res && res.id) {
  //         this.psychologue = res;
  //         // Correction de l'URL Dicebear (ajout de api.)
  //         this.urlImage = "https://dicebear.com/10.x/initials/svg?seed="
  //        + this.psychologue?.prenom 
  //         + " "
  //         + this.psychologue?.nom;
  //         console.log("Assignation réussie. URL Image :", this.urlImage);
  //       } else {
  //         console.log("Données vides ou incorrectes, appel de handleNotFound()");
  //         this.handleNotFound();
  //       }
  //     },
  //     error: (err) => {
  //       console.error("Erreur critique globale :", err);
  //       this.handleNotFound();
  //     }
  //   });
  // }

  // handleNotFound() {
  //   this.psychologue = null;
  //   this.urlImage = "";
  //   alert("Ce psychologue n'existe pas !");
  // }

