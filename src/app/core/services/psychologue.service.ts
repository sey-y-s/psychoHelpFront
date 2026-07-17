import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologue } from '../../models/psychologue.model';
import { map } from 'rxjs/operators';
import { PsychologueListeDto } from '../../models/psychologue-liste.model';
import { Specialite } from '../../models/specialite.model';
import { environments } from '../../../environments/environments.development';


@Injectable({ providedIn: 'root' })
export class PsychologueService {
  // TODO: Remplacer par l'URL réelle
  private readonly apiUrl = `${environments.apiUrl}`
  private api = 'http://localhost:8080/api/psychologues';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PsychologueListeDto[]> {
    return this.http.get<PsychologueListeDto[]>(`${this.apiUrl}/psychologues`, { withCredentials: true }
    ).pipe(
      map((psychologues: PsychologueListeDto[]) =>
        psychologues.filter(p => p.status === false)

      )

    );
  }


  // getAllActifs(): Observable<PsychologueListeDto[]>{
  //   return this.http.get<PsychologueListeDto[]>(`${this.api}/staut===true`)
  // }


  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.apiUrl}/specialites/public`);
  }



  getById(id: number): Observable<PsychologueListeDto> {
    return this.http.get<PsychologueListeDto>(`${this.apiUrl}/psychologues/${id}`, { withCredentials: true });
  }


  create(data: any): Observable<any> {
    return this.http.post<any>(this.api, data, { withCredentials: true });
  }


  update(id: number, data: any): Observable<PsychologueListeDto> {
    return this.http.patch<PsychologueListeDto>(`${this.api}/${id}`, data, { withCredentials: true });
  }


  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`, { withCredentials: true });
  }

  trouverParId(id: number): Observable<Psychologue> {
    return this.http.get<Psychologue>(`${this.api}/${id}`);
  }
}