// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './shared/components/navbar.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, NavbarComponent],
//   template: `
//     <app-navbar></app-navbar>
//     <main style="max-width:1200px; margin:0 auto; padding:1rem">
//       <router-outlet></router-outlet>
//     </main>
//   `
// })
// export class App {}


// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Sidebar } from './shared/components/sidebar/sidebar';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, Sidebar],
//   templateUrl: './app.html'
// })
// export class App {}


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { AuthService } from './core/services/auth.service';
import { Footer } from './shared/components/footer/footer'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Sidebar, Footer],
  templateUrl: './app.html'
})
export class App {
  constructor(public auth: AuthService) {}
}