import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';
import {DashboardStats} from "../../models/admin.dashboard.model";

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private api = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/dashboard`);
  }

}