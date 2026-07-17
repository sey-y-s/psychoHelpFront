import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, finalize, Observable, tap} from 'rxjs';
import { Utilisateur, LoginRequest, RegisterRequest } from '../../models/utilisateur.model';
import { Citoyen } from '../../models/citoyen.model';
import { Psychologue } from '../../models/psychologue.model';
import { Admin } from '../../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080/api';

  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private initialise = false;


  private readonly sessionLoadingSubject = new BehaviorSubject<boolean>(true);

  readonly sessionLoading$ = this.sessionLoadingSubject.asObservable()

  get currentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    // Vérifier si une session existe déjà
    this.verifierSession();
  }


  private verifierSession(): void {
    // Avec les sessions, le cookie est envoyé automatiquement
    this.http.get<Utilisateur>(`${this.api}/utilisateurs/session`,  {
      withCredentials: true
    })
        .pipe(
            finalize(() => {
              this.sessionLoadingSubject.next(false);
            })
        ).subscribe({
      next: utilisateur => {
        this.currentUserSubject.next(utilisateur); 
        this.initialise = true;
      },
      error: () => {
        this.currentUserSubject.next(null); // Pas de session active
        this.initialise = true;
      }
    });
  }
// Methode pour l'inscription du Citoyen
  inscrireCitoyen(citoyen: Citoyen): Observable<any> {

    return this.http.post(
      `${this.api}/citoyens`,
      citoyen,
       { responseType: 'text' }
    );
}

   // Methode pour l'inscription du Psychologue
    inscrirePsychologue(psychologue: Psychologue): Observable<any> {

    return this.http.post(
      `${this.api}/psychologues`,
      psychologue
    );

  }
    // Methode pour l'inscription du Admin
      inscrireAdmin(admin: Admin): Observable<any> {

    return this.http.post(
      `${this.api}/admins`,
      admin
    );

  }

  login(data: LoginRequest): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.api}/utilisateurs/login`, data, { withCredentials: true }).pipe(
      tap(utilisateur => this.currentUserSubject.next(utilisateur))
    );
  }

  register(data: RegisterRequest): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.api}/utilisateurs/register`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.api}/utilisateurs/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.currentUserSubject.next(null))
    );
  }

  estConnecte(): boolean {
    return this.currentUserSubject.value !== null;
  }

  aRole(role: string): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  getUtilisateurId(): number | undefined {
    return this.currentUserSubject.value?.id;
  }
  getUserConnecté(): string | null {
    return localStorage.getItem('utilisateur');
  }
  
  estInitialise(): boolean {
    return this.initialise;
  }
}