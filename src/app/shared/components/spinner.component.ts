import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div style="display:flex; justify-content:center; padding:3rem">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
  `
})
export class SpinnerComponent {}