import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { CategorieTestService } from "../../../core/services/categorie-test.service";
import { Router, RouterLink } from "@angular/router";
import { categorieTest } from "../../../models/categorie-test";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSadTear, faBrain, faBolt, faHeartBroken } from '@fortawesome/free-solid-svg-icons';





@Component({
    selector: 'app-categorie-test',
    imports: [CommonModule, FontAwesomeModule],
    standalone: true,
    templateUrl: './categorie-test.html',
    styleUrl: './categorie-test.css'
})


export class CategorieTestComponent implements OnInit {

    faDepression = faSadTear;

    private categorieService = inject(CategorieTestService);

    private router = inject(Router);

    readonly categories = signal<categorieTest[]>([]);



    ngOnInit(): void {
        this.chargerCategories();
    }

    chargerCategories(): void {

        this.categorieService.getCategories().subscribe(
            {
                next: (data) => {
                    console.log('Données reçues du serveur :', data);
                    this.categories.set(data);
                },
                error: (err) => {
                    console.error('Erreur lors du chargement des catégories', err);
                }

            }


        )




    }



    handleImageError(event: Event): void {
        const element = event.target as HTMLImageElement;
        // Chemin corrigé pour pointer vers le dossier public/images/
        element.src = 'images/default-placeholder.png';
    }


    selectionnerCategorie(id: number): void {
        this.router.navigate(['/me/categories', id, 'tests']);
    }

    // AJOUTEZ BIEN LA MÉTHODE ICI (AVANT L'ACCOLADE DE FIN)
    // Ajoutez ": any" juste après le nom de la fonction
    getIconForCategory(id: number): any {
        switch (id) {
            case 1: return faSadTear;
            case 2: return faBolt;
            case 3: return faBrain;
            default: return faHeartBroken;
        }
    }
}