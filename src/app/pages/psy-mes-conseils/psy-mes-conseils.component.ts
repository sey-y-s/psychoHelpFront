import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConseilService } from '../../core/services/conseil.service';
import { AuthService } from '../../core/services/auth.service';
import { Conseil } from '../../models/conseil.model';
import { NotificationService } from '../../core/services/notification.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { EtatVideComponent } from '../../shared/components/etat-vide.component';

@Component({
  selector: 'app-psy-mes-conseils',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, SpinnerComponent, EtatVideComponent],
  template: `
    <h1 class="page-title">Mes conseils</h1>

    <mat-card class="carte-formulaire">
      <mat-card-header><mat-card-title>Publier un conseil</mat-card-title></mat-card-header>
      <mat-card-content>
        <form [formGroup]="formulaire" (ngSubmit)="publier()">
          <mat-form-field appearance="outline" class="champ-plein">
            <mat-label>Titre</mat-label>
            <input matInput formControlName="titre">
            @if (formulaire.get('titre')?.hasError('required')) { <mat-error>Titre requis</mat-error> }
          </mat-form-field>
          <mat-form-field appearance="outline" class="champ-plein">
            <mat-label>Contenu</mat-label>
            <textarea matInput formControlName="contenu" rows="4"></textarea>
            @if (formulaire.get('contenu')?.hasError('required')) { <mat-error>Contenu requis</mat-error> }
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="formulaire.invalid">Publier</button>
        </form>
      </mat-card-content>
    </mat-card>

    @if (chargement) { <app-spinner></app-spinner> }
    @if (!chargement && conseils.length === 0) {
      <app-etat-vide message="Vous n'avez publié aucun conseil"></app-etat-vide>
    }
    @for (c of conseils; track c.id) {
      <mat-card class="carte-conseil">
        <mat-card-header>
          <mat-card-title>{{ c.titre }}</mat-card-title>
          <mat-card-subtitle>
            {{ c.datePublication || 'En attente de validation' }}
            @if (!c.valide) { <span class="badge-attente">(En attente)</span> }
            @if (c.valide) { <span class="badge-valide">(Validé)</span> }
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content><p>{{ c.contenu }}</p></mat-card-content>
        <mat-card-actions align="end">
          <button mat-icon-button color="warn" (click)="supprimer(c.id!)" title="Supprimer">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    }
  `,
  styles: [`
    .carte-formulaire { margin-bottom:2rem; }
    .champ-plein { width:100%; margin-bottom:1rem; }
    .carte-conseil { margin-bottom:1rem; }
    .badge-attente { color:orange; }
    .badge-valide { color:green; }
  `]
})
export class PsyMesConseilsComponent implements OnInit {
  conseils: Conseil[] = [];
  formulaire: FormGroup;
  chargement = true;

  constructor(
    private fb: FormBuilder,
    private service: ConseilService,
    private auth: AuthService,
    private notif: NotificationService
  ) {
    this.formulaire = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerConseils();
  }

  chargerConseils(): void {
    this.chargement = true;
    this.service.listerMesConseils().subscribe({
      next: data => { this.conseils = data; this.chargement = false; },
      error: () => this.chargement = false
    });
  }

  publier(): void {
    if (this.formulaire.invalid) return;
    const conseil: Conseil = {
      ...this.formulaire.value,
      psychologueId: this.auth.getUtilisateurId() || 0, // TODO: Vérifier que l'ID est bien récupéré
      valide: false
    };
    this.service.creer(conseil).subscribe({
      next: () => {
        this.notif.succes('Conseil publié, en attente de validation');
        this.formulaire.reset();
        this.chargerConseils();
      }
    });
  }

  supprimer(id: number): void {
    // TODO: Ajouter dialogue de confirmation
    this.service.supprimer(id).subscribe({
      next: () => {
        this.notif.succes('Conseil supprimé');
        this.chargerConseils();
      }
    });
  }
}