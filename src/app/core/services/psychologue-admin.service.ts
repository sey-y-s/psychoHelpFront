import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologue } from '../../models/psyForAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class PsychologueAdminService {

  private api = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) {}

  listerEnAttente(): Observable<Psychologue[]> {
    return this.http.get<Psychologue[]>(
      `${this.api}/psychologues/en-attente`
    );
  }

  valider(id: number): Observable<Psychologue> {
    return this.http.put<Psychologue>(
      `${this.api}/psychologues/${id}/valider`,
      {}
    );
  }

  annuler(id: number): Observable<Psychologue> {
    return this.http.put<Psychologue>(
      `${this.api}/psychologues/${id}/annuler`,
      {}
    );
  }

}