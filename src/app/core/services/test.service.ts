import { HttpBackend, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../../../environments/environments.development";
import { Observable } from "rxjs";
import { Test } from "../../models/tests";


@Injectable(
    {
        providedIn: 'root'
    }
)

export class TestService {

    private http = inject(HttpClient);

    private readonly apiUrl = `${environments.apiUrl}/tests`;


    getTests(): Observable<Test[]> {
        return this.http.get<Test[]>(`${this.apiUrl}`, { withCredentials: true });
    }


    getTestsByCategorie(categorieId: number): Observable<Test[]> {
        return this.http.get<Test[]>(`${this.apiUrl}/by-categorie/${categorieId}`, { withCredentials: true });
    }

}