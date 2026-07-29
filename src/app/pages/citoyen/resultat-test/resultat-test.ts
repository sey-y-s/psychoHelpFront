import { CommonModule } from "@angular/common";
import { Component, OnInit, ChangeDetectorRef, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TestPartageService } from "../../../core/services/tests-partage-service";
import { TestService } from "../../../core/services/test.service";       
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-resultat-test",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./resultat-test.html",
  styleUrl: "./resultat-test.css",
})
export class ResultatTest implements OnInit {
  scoreTotal: number = 0;
  pourcentage: number = 0;
   scoreMaximalTest: number = 20;
  niveau: string = 'Minime';
  messageDescription: string = '';
  categorieTest?: any;
  listeDiagnostics: any[] = []
  
  private readonly authService = inject(AuthService);
  readonly currentUser$ = this.authService.currentUser$;

  //Boîtes pour stocker les vraies données de la base de données
  infoTestEnCours: any;
  chargement: boolean = true;

  constructor(
    private testPartageService: TestPartageService,
    private testService: TestService, 
    private route: ActivatedRoute,      
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit() {
    //Récupération du ResultatTestResponseDTO envoyé par le questionnaire
    const resultatDTO = this.testPartageService.getResultatComplet();

    if (resultatDTO) {
      this.scoreTotal = resultatDTO.score; // Extrait le 'score' du DTO Java
      
      //Extraction et découpage de la chaîne de caractères "Niveau - Message"
      if (resultatDTO.description) {
        const parties = resultatDTO.description.split(" - ");
        this.niveau = parties[1] || 'Évaluation';
        this.messageDescription = parties[0] || 'Traitement de votre score en cours.';
      }
    } else {
      // Sécurité si accès direct à la page sans passer le test
      this.scoreTotal = this.testPartageService.getScore();
      this.niveau = 'Minime';
      this.messageDescription = "Aucun résultat récent trouvé. Veuillez passer un test.";
    }

    // Calcul du pourcentage basé sur le score maximum de votre barème (ex: 20 ou 21 points)
    this.pourcentage = Math.round((this.scoreTotal / 20) * 100);

    // Extraction de l'ID du test depuis l'URL pour charger le bandeau d'information
    const testId = Number(this.route.snapshot.queryParamMap.get('id')) || 1; 

    // Chargement du nom du test et de sa description (Table tests)
    this.testService.obtenirTestParId(testId).subscribe({
      next: (testData) => {
        this.infoTestEnCours = testData;
        this.verifierFinChargement();
      },
      error: (err) => {
        console.error("Impossible de charger le test depuis la BDD", err);
        this.verifierFinChargement();
      }
    });
    
     //MODIFICATION STRATEGIQUE : Chargement et calcul dynamique des seuils maximums (Table diagnostics)
    this.testService.obtenirDiagnosticsParTestId(testId).subscribe({
      next: (diagnosticsData: any[]) => {
        console.log("Diagnostics de test reçus :", JSON.stringify(diagnosticsData, null, 2));
        
        if (diagnosticsData && diagnosticsData.length > 0) {
          // Tri automatique par scoreMin croissant pour la légende
          this.listeDiagnostics = diagnosticsData.sort((a: any, b: any) => (a.scoreMin || a.score_min) - (b.scoreMin || b.score_min));
          
          //CALCUL DU SCORE MAXIMAL : Recherche le scoreMax le plus élevé dans les lignes de la table diagnostics MySQL
          this.scoreMaximalTest = Math.max(...diagnosticsData.map((d: any) => d.scoreMax || d.score_max || 20));
          
          //CALCUL DU POURCENTAGE DYNAMIQUE : L'aiguille se calibrera sur le vrai barème (ex: 21, 42 ou 100 points)
          this.pourcentage = Math.round((this.scoreTotal / this.scoreMaximalTest) * 100);
          
          console.log(`Barème détecté pour ce test : ${this.scoreTotal} / ${this.scoreMaximalTest} (${this.pourcentage}%)`);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Échec lors de la récupération de la légende des diagnostics :", err);
      }
    });

  }


  // analyserScore() {
  //   if (this.scoreTotal <= 4) {
  //     this.niveauAnxiete = 'Minime';
  //     this.messageDescription = "Votre niveau d'anxiété se situe dans la zone minimale. Tout semble normal.";
  //   } else if (this.scoreTotal <= 9) {
  //     this.niveauAnxiete = 'Légère';
  //     this.messageDescription = "Votre niveau d'anxiété se situe dans la zone légère. Prenez du temps pour vous détendre.";
  //   } else if (this.scoreTotal <= 14) {
  //     this.niveauAnxiete = 'Modérée';
  //     this.messageDescription = "Votre niveau d'anxiété se situe dans la zone modérée.";
  //   } else {
  //     this.niveauAnxiete = 'Sévère';
  //     this.messageDescription = "Votre niveau d'anxiété se situe dans la zone sévère. Il est vivement conseillé d'en parler à un professionnel.";
  //   }
  // }

  verifierFinChargement() {
    // Dès que les requêtes répondent, on coupe le loader
    this.chargement = false;
    this.cdr.detectChanges();
  }

getBadgeColorClass(scoreMax: number): string {
  if (scoreMax <= 4) {
    return 'text-success';
  } else if (scoreMax <= 9) {
    return 'text-warning';
  } else if (scoreMax <= 14) {
    return 'text-orange';
  } else {
    return 'text-danger';
  }
}

}
