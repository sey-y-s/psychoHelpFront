import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './shared/components/navbar.component';
import { Accueil } from "./pages/accueil/accueil";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],


  templateUrl: './app.html',
 styleUrl: './app.css',
  // template: `
  //  <main style="width:80%; max-width:1200px; float:right; padding:1rem">
  //    <router-outlet></router-outlet>
  //  </main>
 //`
})
export class App {}