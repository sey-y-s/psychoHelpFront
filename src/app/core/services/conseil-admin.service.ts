import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';

@Injectable({ providedIn: 'root' })
export class ConseilAdminService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/admin/conseils';

  constructor(private http: HttpClient) {}

  listerEnAttente(): Observable<Conseil[]> {
    return this.http.get<Conseil[]>(`${this.api}/en-attente`);
  }

  valider(id: number): Observable<any> {
    return this.http.put(`${this.api}/${id}/valider`, {});
  }

  rejeter(id: number): Observable<any> {
    return this.http.put(`${this.api}/${id}/rejeter`, {});
  }
}