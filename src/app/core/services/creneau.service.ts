<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creneau, CreneauInterfaceResponse, CreneauInterfaceResponse2 } from '../../models/creneau.model';
=======
import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Creneau, CreneauRequest, UpdateCreneauRequest} from "../../models/creneau.model";
import {environments} from "../../../environments/environments.development";

>>>>>>> 7d0e306bcc9646b4c6c81d333f0c23d50e65cda1

@Injectable({ providedIn: 'root' })
export class CreneauService {

<<<<<<< HEAD

  constructor(private http: HttpClient) {}
=======
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environments.apiUrl}/creneaux`;
>>>>>>> 7d0e306bcc9646b4c6c81d333f0c23d50e65cda1

  getMesCreneaux(): Observable<Creneau[]>{
    return this.http.get<Creneau[]>(`${this.apiUrl}/mes-creneaux`, {
      withCredentials: true
    });
  }

  getById(id: number):Observable<Creneau> {
    return this.http.get<Creneau>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    })
  }

  creer(creneau: CreneauRequest): Observable<Creneau> {
    return this.http.post<Creneau>(`${this.apiUrl}`, creneau, {
      withCredentials:true
    })
  }
<<<<<<< HEAD
  listerDesCreneaux(): Observable<CreneauInterfaceResponse[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<CreneauInterfaceResponse[]>(`${this.api}`);
  }
  listerDesCreneauxDisponiblePourCitoyen(): Observable<CreneauInterfaceResponse2[]> {
    // TODO: Filtrer par psychologue connecté (l'API doit gérer)
    return this.http.get<CreneauInterfaceResponse2[]>(`${this.api}/${5}/disponiblePourCitoyen`);
  }
=======

  modifier(id: number, creneau: CreneauRequest): Observable<Creneau>{
    return this.http.put<Creneau>(`${this.apiUrl}/${id}`,creneau, {
      withCredentials:true
    })
  }

  supprimer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    })
  }

>>>>>>> 7d0e306bcc9646b4c6c81d333f0c23d50e65cda1
}