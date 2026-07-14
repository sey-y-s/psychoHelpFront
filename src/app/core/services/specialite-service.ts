import { HttpClient } from "@angular/common/http";
import { Injectable, Service } from "@angular/core";
import { Specialite } from "../../models/specialite.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

    
     private api = 'http://localhost:8080/api/specialites/public';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.api);
  }
}
