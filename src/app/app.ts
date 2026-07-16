import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, NavbarComponent],
/*  template: `
    <main style="max-width:1200px; margin:0 auto; padding:1rem">
      <router-outlet></router-outlet>
    </main>
  `

  imports: [RouterOutlet],*/
  templateUrl: "./app.html",
  styleUrl: "./app.css",

})
export class App {}