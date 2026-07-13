import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { seanceInterfaceRequest, SeanceInterfaceResponse } from '../../models/seance.model';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/seances';
  private http=inject(HttpClient)

  constructor() {}
       prendreRdv(seanceInterfaceRequest:seanceInterfaceRequest):Observable<SeanceInterfaceResponse>{
          return this.http.post<SeanceInterfaceResponse>(`${this.api}`,seanceInterfaceRequest)
       }
       
}