import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';
import {environments} from "../../../environments/environments.development";
import { ConseilInfaceModelForPsy, ConseilInfaceModelForPsyRequest } from '../../models/citoyenforPsy.model';

@Injectable({ providedIn: 'root' })
export class ConseilService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environments.apiUrl}/conseils`;

  getMesConseils() {
    return this.http.get<ConseilInfaceModelForPsy[]>(`${this.apiUrl}/mes-conseils`,
        {
          withCredentials: true
        }
    );
  }
  public ajouterConseil(conseil:ConseilInfaceModelForPsyRequest){
     return this.http.post<ConseilInfaceModelForPsy>(`${this.apiUrl}/post`,conseil,{
       withCredentials:true
     })
  }
}