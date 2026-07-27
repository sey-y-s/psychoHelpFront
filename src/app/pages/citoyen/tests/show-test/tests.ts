import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TestService } from '../../../../core/services/test.service';
import { TestEvaluation, Question, OptionChoix } from '../../../../models/test.model';
import { TestPartageService } from '../../../../core/services/tests-partage-service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
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


  constructor(
    private testService: TestService,
    private router :Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private testPartageService: TestPartageService  
    
  ) {}

    ngOnInit() {
    console.log("Le composant de test s'est bien initialisé !");
    
    // Identifiant fixe (ID 1) pour le test GAD-7
    const testId = Number(this.route.snapshot.paramMap.get('id')); 
    console.log("Tentative d'envoi de la requête HTTP GET pour l'ID :", testId);

    this.testService.obtenirTestParId(testId).subscribe({
      next: (data) => {
        console.log("Données reçues du serveur avec succès !");
        console.log("Contenu brut du test :", JSON.stringify(data, null, 2));
        
        if (data) {
          this.testInfo = data;
          this.questions = data.questions || [];
          this.totalQuestions = this.questions.length;
          console.log("Nombre de questions chargées dans le tableau :", this.totalQuestions);
          
          // Force Angular à redessiner l'interface graphique
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error("Échec critique lors de l'appel à l'API Test :", err);
      }
    });

    this.testService.obtenirCategorieParIdTest(testId).subscribe({
      next: (categorieData) => {
        console.log("Catégorie de test reçue :", JSON.stringify(categorieData, null, 2));
        this.categorieTest = categorieData;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Échec lors de la récupération de la catégorie du test :", err);
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
     // Sauvegarde du score calculé dans la boîte mémoire
    this.testPartageService.setScore(this.scoreTotal)

    //Redirection automatique vers la page de résultats
    this.router.navigate(['resultats'], { relativeTo: this.route });

    console.log("Test terminé ! Score obtenu :", this.scoreTotal);

  }

}
