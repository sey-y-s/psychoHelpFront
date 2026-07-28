import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { TestCitoyen } from "../../models/test-citoyen.model";
import {
  Utilisateur,
  LoginRequest,
  RegisterRequest,
} from "../../models/utilisateur.model";
import { Citoyen } from "../../models/citoyen.model";
import { Psychologue } from "../../models/psychologue.model";
import { Admin } from "../../models/admin.model";
import { Conseil, ConseilAffiche } from "../../models/conseil.model";
import { ResultatTestResponse } from "../../models/resultatTest.model";
import { CitoyenRendezVousResponse } from "../../models/seance.model";

@Injectable({ providedIn: "root" })
export class TestCitoyenService {
  constructor(private http: HttpClient) {}
  private api = "http://localhost:8080/api/tests";
  getAllTests(): Observable<TestCitoyen[]> {
    return this.http.get<TestCitoyen[]>(`${this.api}`);
  }
  getTestsByCategorie(categorieId: number): Observable<TestCitoyen[]> {
  return this.http.get<TestCitoyen[]>(
    `${this.api}/by-categorie/${categorieId}`
  );
}
  getTestById(id: number): Observable<TestCitoyen> {
    return this.http.get<TestCitoyen>(`${this.api}/${id}`);
  }

  creeTest(test: TestCitoyen, categorieId: number): Observable<TestCitoyen> {
    return this.http.post<TestCitoyen>(
      `${this.api}?categories_test_id=${categorieId}`,
      test,
    );
  }

  updateTest(id: number, test: TestCitoyen): Observable<TestCitoyen> {
    return this.http.put<TestCitoyen>(`${this.api}/${id}`, test);
  }

  deleteTest(id: number):Observable<string>{
      return this.http.delete<string>(`${this.api}/${id}`)
  }
}
