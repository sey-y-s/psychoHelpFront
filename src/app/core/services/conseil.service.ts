import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';
import {environments} from "../../../environments/environments.development";

@Injectable({ providedIn: 'root' })
export class ConseilService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environments.apiUrl}/conseils`;

  getMesConseils(): Observable<Conseil[]> {
    return this.http.get<Conseil[]>(`${this.apiUrl}/mes-conseils`,
        {
          withCredentials: true
        }
    );
  }
}