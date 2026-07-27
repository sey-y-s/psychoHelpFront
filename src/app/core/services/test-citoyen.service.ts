import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, finalize, Observable, tap} from 'rxjs';
import { Utilisateur, LoginRequest, RegisterRequest } from '../../models/utilisateur.model';
import { Citoyen } from '../../models/citoyen.model';
import { Psychologue } from '../../models/psychologue.model';
import { Admin } from '../../models/admin.model';
import { Conseil, ConseilAffiche } from '../../models/conseil.model';
import { ResultatTestResponse } from '../../models/resultatTest.model';
import { CitoyenRendezVousResponse } from '../../models/seance.model';


@Injectable({ providedIn: 'root' })
export class TestCitoyen {
    constructor(private http: HttpClient){

    }
  private api = 'http://localhost:8080/api';
   getAllTests():Observable<TestCitoyen[]>{
    return this.http.get<TestCitoyen[]>(`${this.api}/api/tests`);

   }
}