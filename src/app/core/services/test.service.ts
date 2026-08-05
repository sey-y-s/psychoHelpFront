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

  private apiResultats = 'http://localhost:8080/api/resultats/calculer';

  // Récupère un test spécifique avec toutes ses questions associées
  obtenirTestParId(id: number): Observable<TestEvaluation> {
    return this.http.get<TestEvaluation>(`${this.api}/${id}`);
  }

  obtenirCategorieParIdTest(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/categories/du_test/${id}`);
  }

  //Envoie le score et les infos au backend pour enregistrement
  enregistrerResultat(requestDTO: { citoyenId: number; testId: number; score: number }): Observable<any> {
    return this.http.post<any>(this.apiResultats, requestDTO);
  }

  obtenirDiagnosticsParTestId(testId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/diagnostics/test/${testId}`);
  }


  private readonly apiUrl = `${environments.apiUrl}/tests`;

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}`);
  }

  getTestsByCategorie(categorieId: number): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/by-categorie/${categorieId}`);
  }

}