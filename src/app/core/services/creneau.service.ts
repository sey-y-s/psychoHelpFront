import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creneau, CreneauInterfaceResponse } from '../../models/creneau.model';

@Injectable({ providedIn: 'root' })
export class CreneauService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/creneaux';

  constructor(private http: HttpClient) {}

  listerMesCreneaux(): Observable<Creneau[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<Creneau[]>(`${this.api}/mes-creneaux`);
  }

  creer(creneau: Creneau): Observable<Creneau> {
    return this.http.post<Creneau>(this.api, creneau);
  }

  supprimer(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
  listerDesCreneaux(): Observable<CreneauInterfaceResponse[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<CreneauInterfaceResponse[]>(`${this.api}`);
  }
}