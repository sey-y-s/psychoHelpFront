import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/seances';

  constructor(private http: HttpClient) {}

  prendreRendezVous(data: { creneauId: number; citoyenId: number }): Observable<any> {
    // TODO: Adapter le payload au format attendu par l'API
    return this.http.post(`${this.api}/prendre-rendez-vous`, data);
  }
}