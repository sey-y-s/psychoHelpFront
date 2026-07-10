import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-etat-vide',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div style="text-align:center; padding:3rem; color:#999">
      <mat-icon style="font-size:3rem; width:3rem; height:3rem">inbox</mat-icon>
      <p>{{ message }}</p>
    </div>
  `
})
export class EtatVideComponent {
  @Input() message = 'Aucune donnée disponible';
}