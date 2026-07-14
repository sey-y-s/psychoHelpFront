<<<<<<< HEAD
import { inject, Injectable } from '@angular/core';
=======

import { Injectable } from '@angular/core';
>>>>>>> 7d0e306bcc9646b4c6c81d333f0c23d50e65cda1
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { seanceInterfaceRequest, seanceInterfaceRequest2, SeanceInterfaceResponse } from '../../models/seance.model';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  // TODO: Remplacer par l'URL réelle
  private api = 'http://localhost:8080/api/seances';
  private http=inject(HttpClient)

  constructor() {}
       prendreRdv(seanceInterfaceRequest:seanceInterfaceRequest):Observable<SeanceInterfaceResponse>{
          return this.http.post<SeanceInterfaceResponse>(`${this.api}`,seanceInterfaceRequest)
       }
       prendreRdv2(seanceInterfaceRequest:seanceInterfaceRequest):Observable<SeanceInterfaceResponse>{
          return this.http.post<SeanceInterfaceResponse>(`${this.api}`,seanceInterfaceRequest,{
            withCredentials:true
          })
       }
       
}