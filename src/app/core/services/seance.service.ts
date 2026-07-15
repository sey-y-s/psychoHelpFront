import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environments} from "../../../environments/environments.development";
import {RendezVous} from "../../models/rendez-vous.model";

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environments.apiUrl}/seances`;

  getMesRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/mes-rdv`,
        {
          withCredentials: true
        }
    );
  }

  confirmer(id: number): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}/confirmer`, {},
        {
          withCredentials: true
        }
    );
  }

  annuler(id: number): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}/annuler`, {},
        {
          withCredentials: true
        }
    );
  }
}