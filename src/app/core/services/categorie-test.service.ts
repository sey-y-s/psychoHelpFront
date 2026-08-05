import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../../../environments/environments.development";
import { Observable } from "rxjs";
import { Conseil } from "../../models/conseil.model";
import { categorieTest } from "../../models/categorie-test";






@Injectable(
    {
        providedIn: 'root'
    }
)

export class CategorieTestService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = `${environments.apiUrl}/categories`;

    getCategories(): Observable<categorieTest[]> {
        return this.http.get<categorieTest[]>(`${this.apiUrl}`);
    }


    getByCategorie(id: number): Observable<categorieTest[]> {
        return this.http.get<categorieTest[]>(`${this.apiUrl}/categories/${id}`);
    }

    creerCategorie(categorie: categorieTest): Observable<categorieTest> {
        return this.http.post<categorieTest>("http://localhost:8080/api/categories", categorie);
    }
}