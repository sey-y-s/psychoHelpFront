import { Component, inject } from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-page-not-found",
  imports: [RouterLink, MatIconModule, AsyncPipe],
  templateUrl: "./page-not-found.html",
  styleUrl: "./page-not-found.css",
})
export class PageNotFound {

  
  private readonly authService = inject(AuthService);
  readonly currentUser$ = this.authService.currentUser$;

  
  obtenirRoute(role? : string): string {
    switch (role) {
      case 'PSYCHOLOGUE':
        return '/psy';

      case 'ADMIN':
        return '/admin';

      case 'CITOYEN':
        return '/me';

      default:
        return '/login';
    }
  }
  

}
