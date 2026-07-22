import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { routes } from "../../../app.routes";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-resultat-test",
  imports: [CommonModule, RouterLink],
  templateUrl: "./resultat-test.html",
  styleUrl: "./resultat-test.css",
})
export class ResultatTest implements OnInit {
  
  // 👈 Reçoit le score total calculé par le composant de questionnaire
  @Input() scoreTotal: number = 0; 
  
  pourcentage: number = 0;
  niveauAnxiete: string = 'Minime';
  messageDescription: string = '';

  ngOnInit() {
    // Calcul du pourcentage basé sur le score maximum possible (20 points)
    if (this.scoreTotal > 20) this.scoreTotal = 20; // Sécurité au cas où le score dépasse 20
    this.pourcentage = Math.round((this.scoreTotal / 20) * 100);

    // Échelle d'évaluation clinique et messages personnalisés de la maquette
    if (this.scoreTotal <= 4) {
      this.niveauAnxiete = 'Minime';
      this.messageDescription = "Votre niveau d'anxiété se situe dans la zone minimale. Tout semble normal.";
    } else if (this.scoreTotal <= 9) {
      this.niveauAnxiete = 'Légère';
      this.messageDescription = "Votre niveau d'anxiété se situe dans la zone légère. Prenez du temps pour vous détendre.";
    } else if (this.scoreTotal <= 14) {
      this.niveauAnxiete = 'Modérée';
      this.messageDescription = "Votre niveau d'anxiété se situe dans la zone modérée.";
    } else {
      this.niveauAnxiete = 'Sévère';
      this.messageDescription = "Votre niveau d'anxiété se situe dans la zone sévère. Il est vivement conseillé d'en parler à un professionnel.";
    }
  }
}
