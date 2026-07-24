import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';

@Injectable({ providedIn: 'root' })
export class ConseilCitoyenService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/conseils';

  constructor(private http: HttpClient) {}
listConseilParStatus(status: string): Observable<Conseil[]> {
    return this.http.get<Conseil[]>(`${this.api}/read?status=${status}`);
  }
  conseilById(id:number):Observable<Conseil>{
    return this.http.get<Conseil>(`${this.api}/${id}`);
    
  
}
}
