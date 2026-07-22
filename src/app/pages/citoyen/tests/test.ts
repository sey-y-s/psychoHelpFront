import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { CategorieTestService } from "../../../core/services/categorie-test.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { categorieTest } from "../../../models/categorie-test";
import { TestService } from "../../../core/services/test.service";
import { Test } from "../../../models/tests";





@Component({
    selector: 'app-categorie-test',
    imports: [CommonModule, RouterLink],
    standalone: true,
    templateUrl: './test.html',
    styleUrl: './test.css'
})


export class TestComponent implements OnInit {

    private testService = inject(TestService);

    private readonly route = inject(ActivatedRoute);

    readonly tests = signal<Test[]>([]);




    ngOnInit(): void {
        const idCategorie = Number(this.route.snapshot.paramMap.get('id'));
        this.chargerTests(idCategorie);
    }

    chargerTests(idCategorie: number): void {
        this.testService.getTestsByCategorie(idCategorie).subscribe(
            {
                next: (data) => {
                    console.log('Données reçues du serveur :', data);
                    this.tests.set(data);
                },
                error: (err) => {
                    console.error('Erreur lors du chargement des tests', err);
                }

            }
        )
    }


}