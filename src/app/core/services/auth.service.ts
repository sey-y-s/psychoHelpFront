import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utilisateur, LoginRequest, RegisterRequest } from '../../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // TODO: Remplacer par l'URL réelle de l'API Spring Boot
  private api = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Restaurer la session si un utilisateur est stocké
    const stored = localStorage.getItem('utilisateur');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }

  login(data: LoginRequest): Observable<Utilisateur> {
    // TODO: Adapter la requête et la réponse au format de l'API
   return this.http.post<Utilisateur>(`${this.api}/login`, data);
  }

  register(data: RegisterRequest): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.api}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('utilisateur');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estConnecte(): boolean {
    return !!this.getToken();
  }

  aRole(role: string): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  getUtilisateurId(): number | undefined {
    return this.currentUserSubject.value?.id;
  }
}