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
    return this.http.get<ConseilInfaceModelForPsy[]>(`${this.apiUrl}/mes-conseils`
    );
  }
  public ajouterConseil(conseil:ConseilInfaceModelForPsyRequest){
     return this.http.post<ConseilInfaceModelForPsy>(`${this.apiUrl}/post`,conseil)
  }
  public getConseilById(id:number){
    return this.http.get<ConseilInfaceModelForPsy>(`${this.apiUrl}/${id}`)
  }
  public modifier(id:number,conseil:ConseilInfaceModelForPsyRequest){
      return this.http.put<ConseilInfaceModelForPsy>(`${this.apiUrl}/update/${id}`,conseil)
  }
  public suprrimer(id:number){
     return this.http.delete<string>(`${this.apiUrl}/delete/${id}`)
  }
}