import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologue } from '../../models/psychologue.model';

@Injectable({ providedIn: 'root' })
export class PsychologueAdminService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/admin/psychologues';

  constructor(private http: HttpClient) {}

  listerEnAttente(): Observable<Psychologue[]> {
    return this.http.get<Psychologue[]>(`${this.api}/en-attente`);
  }

  valider(id: number): Observable<any> {
    return this.http.put(`${this.api}/${id}/valider`, {});
  }

  rejeter(id: number): Observable<any> {
    return this.http.put(`${this.api}/${id}/rejeter`, {});
  }
}