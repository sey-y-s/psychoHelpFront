import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creneau, CreneauInterfaceResponse, CreneauInterfaceResponse2, CreneauRequest } from '../../models/creneau.model';
import { environments } from '../../../environments/environments.development';

@Injectable({ providedIn: 'root' })
export class CreneauService {
  private api = 'http://localhost:8080/api/seances';

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environments.apiUrl}/creneaux`;

  getMesCreneaux(): Observable<Creneau[]>{
    return this.http.get<Creneau[]>(`${this.apiUrl}/mes-creneaux`, {
      withCredentials: true
    });
  }

  getById(id: number):Observable<Creneau> {
    return this.http.get<Creneau>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    })
  }

  creer(creneau: CreneauRequest): Observable<Creneau> {
    return this.http.post<Creneau>(`${this.apiUrl}`, creneau, {
      withCredentials:true
    })
  }
  listerDesCreneaux(): Observable<CreneauInterfaceResponse[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<CreneauInterfaceResponse[]>(`${this.api}`);
  }
  listerDesCreneauxDisponiblePourCitoyen(psyid:number): Observable<CreneauInterfaceResponse2[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<CreneauInterfaceResponse2[]>(`${environments.apiUrl}/creneaux/${psyid}/disponiblePourCitoyen`, {withCredentials:true});
  }

  modifier(id: number, creneau: CreneauRequest): Observable<Creneau>{
    return this.http.put<Creneau>(`${this.apiUrl}/${id}`,creneau, {
      withCredentials:true
    })
  }

  supprimer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    })
  }

}