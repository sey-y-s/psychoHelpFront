import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestPartageService {
  private scoreMiseEnMemoire: number = 0;
  
  //  Nouvelle variable pour stocker l'objet ResultatTestResponseDTO de Spring Boot
  private resultatComplet: any = null; 

  constructor() {}

  setScore(score: number): void {
    this.scoreMiseEnMemoire = score;
    console.log("Score mis en mémoire dans le service :", this.scoreMiseEnMemoire);
  }

  getScore(): number {
    console.log("Récupération du score depuis le service :", this.scoreMiseEnMemoire);
    return this.scoreMiseEnMemoire;
  }

  
  // Permet au questionnaire de sauvegarder le DTO reçu de la BDD après le POST
  
  setResultatComplet(resultat: any): void {
    this.resultatComplet = resultat;
    console.log("Objet de résultat complet sauvegardé dans le service :", this.resultatComplet);
  }

  
  //  Permet à la page de résultats de lire le DTO complet (score, description, etc.)
  
  getResultatComplet(): any {
    console.log("Récupération de l'objet de résultat complet depuis le service");
    return this.resultatComplet;
  }

  clearScore(): void {
    this.scoreMiseEnMemoire = 0;
    this.resultatComplet = null; //Nettoie aussi l'objet complet
  }
}
