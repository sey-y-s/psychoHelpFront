import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologue } from '../../models/psyForAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class PsychologueAdminService {

  private api = 'http://localhost:8080/api/psychologues';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les psychologues
   */
  listerEnAttenteTest(): Observable<Psychologue[]> {
    return this.http.get<Psychologue[]>(`${this.api}`);
  }

  /**
   * Récupérer les psychologues en attente (si endpoint existe)
   */
  listerEnAttente(): Observable<Psychologue[]> {
    return this.http.get<Psychologue[]>(`${this.api}/en-attente`);
  }

  /**
   * Valider un psychologue
   */
  valider(id: number): Observable<Psychologue> {
    return this.http.put<Psychologue>(
      `${this.api}/psychologues/${id}/valider`,
      {}
    );
  }

  /**
   * Annuler/Refuser un psychologue
   */
  annuler(id: number): Observable<Psychologue> {
    return this.http.put<Psychologue>(
      `${this.api}/psychologues/${id}/annuler`,
      {}
    );
  }
}