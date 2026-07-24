import { HttpBackend, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../../../environments/environments.development";
import { Observable } from "rxjs";
import { Test } from "../../models/tests";
import { TestEvaluation } from '../../models/test.model';


@Injectable(
    {
        providedIn: 'root'
    }
)

export class TestService {

    private http = inject(HttpClient);

    private api = 'http://localhost:8080/api/tests';

    // Récupère un test spécifique (ex: GAD-7) avec toutes ses questions associées
    obtenirTestParId(id: number): Observable<TestEvaluation> {
      return this.http.get<TestEvaluation>(`${this.api}/${id}`);
    }

    obtenirCategorieParIdTest(id: number): Observable<any> {
      return this.http.get<any>(`http://localhost:8080/api/categories/du_test/${id}`);
    }


    private readonly apiUrl = `${environments.apiUrl}/tests`;
    
    getTests(): Observable<Test[]> {
        return this.http.get<Test[]>(`${this.apiUrl}`, { withCredentials: true });
    }

    getTestsByCategorie(categorieId: number): Observable<Test[]> {
        return this.http.get<Test[]>(`${this.apiUrl}/by-categorie/${categorieId}`, { withCredentials: true });
    }

}