import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TestService } from '../../../../core/services/test.service';
import { TestEvaluation, Question, OptionChoix } from '../../../../models/test.model';

@Component({
  selector: 'app-test-anxiete',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './tests.html',
  styleUrl: './tests.css'
})
export class Tests implements OnInit {
  testInfo?: any;
  questions: any[] = [];
  categorieTest?: any;
  indexActuel = 0; 
  totalQuestions = 0;
  testTermine = false;
  scoreTotal = 0;

  // Tableau pour stocker la réponse de l'utilisateur (clé: id de la question, valeur: score de 0 à 3)
  reponsesUtilisateur: { [key: number]: number } = {};

  //  Aligné avec votre interface OptionChoix (id, choix, score)
  // options: OptionChoix[] = [
  //   { id: 1, choix: 'Pas du tout', score: 0 },
  //   { id: 2, choix: 'Plusieurs jours', score: 1 },
  //   { id: 3, choix: 'Plus de la moitié du temps', score: 2 },
  //   { id: 4, choix: 'Presque tous les jours', score: 3 }
  // ];

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit() {
    console.log("🚀 Le composant de test s'est bien initialisé !");
    
    // Identifiant fixe (ID 1) pour le test GAD-7
    const testId = Number(this.route.snapshot.paramMap.get('id')); 
    console.log("Tentative d'envoi de la requête HTTP GET pour l'ID :", testId);

    this.testService.obtenirTestParId(testId).subscribe({
      next: (data) => {
        console.log("✅ Données reçues du serveur avec succès !");
        console.log("Contenu brut du test :", JSON.stringify(data, null, 2));
        
        if (data) {
          this.testInfo = data;
          this.questions = data.questions || [];
          //this.choix = data.choix || [];
          this.totalQuestions = this.questions.length;
          console.log("Nombre de questions chargées dans le tableau :", this.totalQuestions);
          
          // Force Angular à redessiner l'interface graphique
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error("❌ Échec critique lors de l'appel à l'API Test :", err);
      }
    });

    this.testService.obtenirCategorieParIdTest(testId).subscribe({
      next: (categorieData) => {
        console.log("✅ Catégorie de test reçue :", JSON.stringify(categorieData, null, 2));
        this.categorieTest = categorieData;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("❌ Échec lors de la récupération de la catégorie du test :", err);
      }
    });
  }


  get questionActuelle(): any {
    return this.questions.length > 0 ? this.questions[this.indexActuel] : null;
  }


  // Lit le score mémorisé pour la question en cours
  get reponseSelectionnee(): number | null {
    if (!this.questionActuelle) return null;
    const qId = this.questionActuelle.id;
    return this.reponsesUtilisateur[qId] !== undefined ? this.reponsesUtilisateur[qId] : null;
  }

 // Enregistre le score choisi par l'utilisateur
  set reponseSelectionnee(valeur: number | null) {
    if (valeur !== null && this.questionActuelle) {
      this.reponsesUtilisateur[this.questionActuelle.id] = valeur;
    }
  }

  suivante() {
    if (this.indexActuel < this.totalQuestions - 1) {
      this.indexActuel++;
    } else {
      this.calculerScoreFinal();
    }
  }

   precedente() {
    if (this.indexActuel > 0) {
      this.indexActuel--;
    }
  }


  calculerScoreFinal() {
    this.scoreTotal = 0;
    this.questions.forEach(q => {
      // On additionne directement le score stocké pour chaque question
      this.scoreTotal += this.reponsesUtilisateur[q.id] || 0;
    });
    this.testTermine = true;
    console.log("Test terminé ! Score obtenu :", this.scoreTotal);
  }

}
