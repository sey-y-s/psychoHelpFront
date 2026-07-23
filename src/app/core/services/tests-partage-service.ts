import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestPartageService {
  private scoreMiseEnMemoire: number = 0;

  constructor() {}

  setScore(score: number): void {
    this.scoreMiseEnMemoire = score;
    console.log("Score mis en mémoire dans le service :", this.scoreMiseEnMemoire);
  }

  getScore(): number {
    console.log("Récupération du score depuis le service :", this.scoreMiseEnMemoire);
    return this.scoreMiseEnMemoire;
  }

  clearScore(): void {
    this.scoreMiseEnMemoire = 0;
  }
}
