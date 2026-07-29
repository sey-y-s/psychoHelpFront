import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';
import {DashboardStats} from "../../models/admin.dashboard.model";
import { Admin } from '../../models/admin.model';
import { AdminAdd } from '../../models/adminAdd.model';
@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private api = 'http://localhost:8080/api/utilisateurs';
  private apis='http://localhost:8080/api/admins';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/dashboard`);
  }

  getListAdmin():Observable<AdminAdd[]>{
    return this.http.get<AdminAdd[]>(`${this.apis}`);
  }
  creeAdmin(admin: AdminAdd): Observable<AdminAdd> {
      return this.http.post<AdminAdd>(
        `${this.apis}`,
        admin,
      );
    }
  
    updateTest(id: number, admin: AdminAdd): Observable<AdminAdd> {
      return this.http.put<AdminAdd>(`${this.apis}/${id}`, admin);
    }
    AdminById(id:number):Observable<AdminAdd>{
    return this.http.get<AdminAdd>(`${this.apis}/${id}`);
    
  
}
}