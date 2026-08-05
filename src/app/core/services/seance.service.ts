import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from "../../../environments/environments.development";
import { RendezVous } from "../../models/rendez-vous.model";
import { seanceInterfaceRequest2, SeanceInterfaceResponse } from '../../models/seance.model';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environments.apiUrl}/seances`;

  getMesRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/mes-rdv`
    );
  }

  confirmer(id: number): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}/confirmer`, {}
    );
  }

  annuler(id: number): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}/annuler`, {}
    );
  }
  prendreRdv2(seanceInterfaceRequest: seanceInterfaceRequest2): Observable<SeanceInterfaceResponse> {
    return this.http.post<SeanceInterfaceResponse>(`${this.apiUrl}`, seanceInterfaceRequest)
  }
}