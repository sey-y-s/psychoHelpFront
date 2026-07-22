import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEvaluation } from '../../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private api = 'http://localhost:8080/api/tests';

  constructor(private http: HttpClient) {}

  // Récupère un test spécifique (ex: GAD-7) avec toutes ses questions associées
  obtenirTestParId(id: number): Observable<TestEvaluation> {
    return this.http.get<TestEvaluation>(`${this.api}/${id}`);
  }

  obtenirCategorieParIdTest(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/categories/du_test/${id}`);
  }
}
