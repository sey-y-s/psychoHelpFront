import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';

@Injectable({ providedIn: 'root' })
export class ConseilService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/conseils';

  constructor(private http: HttpClient) {}

  listerMesConseils(): Observable<Conseil[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<Conseil[]>(`${this.api}/mes-conseils`);
  }

  creer(conseil: Conseil): Observable<Conseil> {
    return this.http.post<Conseil>(this.api, conseil);
  }

  supprimer(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}