import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {Creneau, CreneauRequest, UpdateCreneauRequest} from "../../../../models/creneau.model";

@Component({
  selector: "app-creneau-form",
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: "./creneau-form.html",
  styleUrl: "./creneau-form.css",
})
export class CreneauForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() creneau: Creneau | null = null;
  @Input() traitement = false;

  @Output() fermer = new EventEmitter<void>();
  @Output() enregistrer =
      new EventEmitter<CreneauRequest | UpdateCreneauRequest>();

  readonly jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  readonly formulaire = this.fb.nonNullable.group({
    jours: ['Lundi', Validators.required],
    heureDebut: ['08:00', Validators.required],
    heureFin: ['09:00', Validators.required],
    statut: [true, Validators.required]
  });

  ngOnChanges(): void {
    if (this.creneau) {
      this.formulaire.setValue({
        jours: this.creneau.jours,
        heureDebut: this.formaterHeure(this.creneau.heureDebut),
        heureFin: this.formaterHeure(this.creneau.heureFin),
        statut: this.creneau.statut
      });
    } else {
      this.formulaire.reset({
        jours: 'Lundi',
        heureDebut: '08:00',
        heureFin: '09:00',
        statut: true
      });
    }
  }

  soumettre(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    const valeur = this.formulaire.getRawValue();

    if (valeur.heureDebut >= valeur.heureFin) {
      return;
    }

    this.enregistrer.emit(valeur);
  }

  fermerFormulaire(): void {
    this.fermer.emit();
  }

  private formaterHeure(heure: string): string {
    return heure.substring(0, 5);
  }
}
