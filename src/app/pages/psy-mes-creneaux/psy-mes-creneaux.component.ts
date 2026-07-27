import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreneauService } from '../../core/services/creneau.service';
import { AuthService } from '../../core/services/auth.service';
import { Creneau } from '../../models/creneau.model';
import { NotificationService } from '../../core/services/notification.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { EtatVideComponent } from '../../shared/components/etat-vide.component';

@Component({
  selector: 'app-psy-mes-creneaux',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, SpinnerComponent, EtatVideComponent],
  template: `
    <h1 class="page-title">Mes créneaux</h1>

    <mat-card class="carte-formulaire">
      <mat-card-header><mat-card-title>Ajouter un créneau</mat-card-title></mat-card-header>
      <mat-card-content>
        <form [formGroup]="formulaire" (ngSubmit)="ajouter()" class="formulaire-creneau">
          <mat-form-field appearance="outline">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <!-- TODO: Formater la date pour l'API (YYYY-MM-DD) -->
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Heure début</mat-label>
            <input matInput formControlName="heureDebut" type="time">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Heure fin</mat-label>
            <input matInput formControlName="heureFin" type="time">
            <!-- TODO: Valider que heureFin > heureDebut -->
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="formulaire.invalid">Ajouter</button>
        </form>
      </mat-card-content>
    </mat-card>

    @if (chargement) { <app-spinner></app-spinner> }
    @if (!chargement && creneaux.length === 0) {
      <app-etat-vide message="Aucun créneau configuré"></app-etat-vide>
    }
    <div class="grille-creneaux">
      @for (c of creneaux; track c.id) {
        <mat-card class="carte-creneau">
          <mat-card-content>
            <p><strong>{{ c.date }}</strong></p>
            <p>{{ c.heureDebut }} - {{ c.heureFin }}</p>
            <p>
              @if (c.disponible) { <span class="disponible">Disponible</span> }
              @else { <span class="reserve">Réservé</span> }
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-icon-button color="warn" (click)="supprimer(c.id!)" title="Supprimer">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .carte-formulaire { margin-bottom:2rem; }
    .formulaire-creneau { display:flex; gap:1rem; flex-wrap:wrap; align-items:flex-start; }
    .grille-creneaux { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1rem; }
    .carte-creneau { text-align:center; }
    .disponible { color:green; }
    .reserve { color:red; }
  `]
})
export class PsyMesCreneauxComponent implements OnInit {
  creneaux: Creneau[] = [];
  formulaire: FormGroup;
  chargement = true;

  constructor(
    private fb: FormBuilder,
    private service: CreneauService,
    private auth: AuthService,
    private notif: NotificationService
  ) {
    this.formulaire = this.fb.group({
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerCreneaux();
  }

  chargerCreneaux(): void {
    this.chargement = true;
    this.service.listerMesCreneaux().subscribe({
      next: data => { this.creneaux = data; this.chargement = false; },
      error: () => this.chargement = false
    });
  }

  ajouter(): void {
    if (this.formulaire.invalid) return;
    const creneau: Creneau = {
      ...this.formulaire.value,
      psychologueId: this.auth.getUtilisateurId() || 0, // TODO: Vérifier que l'ID est bien récupéré
      disponible: true
    };
    this.service.creer(creneau).subscribe({
      next: () => {
        this.notif.succes('Créneau ajouté');
        this.formulaire.reset();
        this.chargerCreneaux();
      }
    });
  }

  supprimer(id: number): void {
    // TODO: Ajouter dialogue de confirmation
    this.service.supprimer(id).subscribe({
      next: () => {
        this.notif.succes('Créneau supprimé');
        this.chargerCreneaux();
      }
    });
  }
}