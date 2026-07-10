import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary">
      <span routerLink="/" style="cursor:pointer">🧠 SerenityLink</span>
      <span style="flex:1"></span>
      @if (auth.currentUser$ | async; as utilisateur) {
        <button mat-button routerLink="/psychologues">Psychologues</button>
        @if (utilisateur.role === 'ADMIN') {
          <button mat-button routerLink="/admin">Administration</button>
        }
        @if (utilisateur.role === 'PSYCHOLOGUE') {
          <button mat-button routerLink="/psy">Espace Psy</button>
        }
        <button mat-button [matMenuTriggerFor]="menu">{{ utilisateur.prenom }}</button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="deconnexion()">Déconnexion</button>
        </mat-menu>
      } @else {
        <button mat-button routerLink="/login">Connexion</button>
        <button mat-raised-button routerLink="/register">Inscription</button>
      }
    </mat-toolbar>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}