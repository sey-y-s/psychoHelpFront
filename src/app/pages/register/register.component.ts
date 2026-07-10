import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="page-centree">
      <mat-card class="carte-auth">
        <mat-card-header><mat-card-title>Inscription</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="formulaire" (ngSubmit)="inscription()">
            <mat-form-field appearance="outline" class="champ-plein">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom">
              @if (formulaire.get('nom')?.hasError('required')) { <mat-error>Nom requis</mat-error> }
            </mat-form-field>
            <mat-form-field appearance="outline" class="champ-plein">
              <mat-label>Prénom</mat-label>
              <input matInput formControlName="prenom">
              @if (formulaire.get('prenom')?.hasError('required')) { <mat-error>Prénom requis</mat-error> }
            </mat-form-field>
            <mat-form-field appearance="outline" class="champ-plein">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              @if (formulaire.get('email')?.hasError('required')) { <mat-error>Email requis</mat-error> }
              @if (formulaire.get('email')?.hasError('email')) { <mat-error>Email invalide</mat-error> }
            </mat-form-field>
            <mat-form-field appearance="outline" class="champ-plein">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="motDePasse" type="password">
              @if (formulaire.get('motDePasse')?.hasError('required')) { <mat-error>Mot de passe requis</mat-error> }
              @if (formulaire.get('motDePasse')?.hasError('minlength')) { <mat-error>6 caractères minimum</mat-error> }
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="formulaire.invalid || chargement" class="champ-plein">
              {{ chargement ? 'Inscription...' : "S'inscrire" }}
            </button>
          </form>
          <p class="lien-auth">Déjà un compte ? <a routerLink="/login">Se connecter</a></p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-centree { display:flex; justify-content:center; padding-top:3rem; }
    .carte-auth { width:100%; max-width:400px; }
    .champ-plein { width:100%; margin-bottom:1rem; }
    .lien-auth { text-align:center; margin-top:1rem; }
  `]
})
export class RegisterComponent {
  formulaire: FormGroup;
  chargement = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notif: NotificationService
  ) {
    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  inscription(): void {
    if (this.formulaire.invalid) return;
    this.chargement = true;
    this.auth.register(this.formulaire.value).subscribe({
      next: () => {
        this.notif.succes('Inscription réussie, connectez-vous');
        this.router.navigate(['/login']);
      },
      error: () => this.chargement = false
    });
  }
}