import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologue } from '../../models/psychologue.model';

@Injectable({ providedIn: 'root' })
export class PsychologueService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/psychologues';

  constructor(private http: HttpClient) {}

  lister(): Observable<Psychologue[]> {
    // TODO: Ajouter pagination et filtres
    return this.http.get<Psychologue[]>(this.api);
  }

  trouverParId(id: number): Observable<Psychologue> {
    return this.http.get<Psychologue>(`${this.api}/${id}`);
  }
}