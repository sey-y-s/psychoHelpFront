import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';
import { Accueil } from "./pages/accueil/accueil";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Accueil],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}