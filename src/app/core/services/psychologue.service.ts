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
  private readonly apiUrl = `${environments.apiUrl}`
  private api = 'http://localhost:8080/api/psychologues';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PsychologueListeDto[]> {
    return this.http.get<PsychologueListeDto[]>(`${this.apiUrl}/psychologues`
    ).pipe(
      map((psychologues: PsychologueListeDto[]) =>
        psychologues.filter(p => p.status === 'VALIDER')

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
    return this.http.get<PsychologueListeDto>(`${this.apiUrl}/psychologues/${id}`);
  }


  create(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }


  update(id: number, data: any): Observable<PsychologueListeDto> {
    return this.http.patch<PsychologueListeDto>(`${this.api}/${id}`, data);
  }


  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  trouverParId(id: number): Observable<Psychologue> {
    return this.http.get<Psychologue>(`${this.api}/${id}`);
  }

}
