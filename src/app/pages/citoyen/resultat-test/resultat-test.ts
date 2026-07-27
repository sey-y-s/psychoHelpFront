import { CommonModule } from "@angular/common";
import { Component, OnInit, ChangeDetectorRef, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TestPartageService } from "../../../core/services/tests-partage-service";
import { TestService } from "../../../core/services/test.service";       
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-resultat-test",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./resultat-test.html",
  styleUrl: "./resultat-test.css",
})
export class ResultatTest implements OnInit {
  scoreTotal: number = 0;
  pourcentage: number = 0;
  niveauAnxiete: string = 'Minime';
  messageDescription: string = '';
  categorieTest?: any;
  
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
    // On récupère le score calculé à la page précédente
    this.scoreTotal = this.testPartageService.getScore();

    const testId = Number(this.route.snapshot.paramMap.get('id')); 
    console.log("Tentative d'envoi de la requête HTTP GET pour l'ID :", testId);

    // Calcul du pourcentage sur base de 20 points
    if (this.scoreTotal > 20) this.scoreTotal = 20; 
    this.pourcentage = Math.round((this.scoreTotal / 20) * 100);

    // Échelle clinique GAD-7
    this.analyserScore();


    // On charge les infos du test (ex: ID 1 pour le GAD-7)
    this.testService.obtenirTestParId(1).subscribe({
      next: (testData) => {
        this.infoTestEnCours = testData;
        this.verifierFinChargement();
      },
      error: (err) => {
        console.error("Impossible de charger le test depuis la BDD", err);
        this.verifierFinChargement();
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

  analyserScore() {
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

  verifierFinChargement() {
    // Dès que les requêtes répondent, on coupe le loader
    this.chargement = false;
    this.cdr.detectChanges();
  }
}
