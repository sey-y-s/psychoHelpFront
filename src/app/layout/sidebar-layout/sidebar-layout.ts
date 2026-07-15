import {Component, inject} from "@angular/core";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../core/services/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: "app-sidebar-layout",
  imports: [RouterLink, RouterLinkActive, MatIcon, AsyncPipe],
  templateUrl: "./sidebar-layout.html",
  styleUrl: "./sidebar-layout.css",
})
export class SidebarLayout {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser$ = this.authService.currentUser$;

  deconnexionEnCours = false;

  logout(): void {
    if (this.deconnexionEnCours) {
      return;
    }
    this.deconnexionEnCours = true;
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: error => {
        console.error('Erreur pendant la déconnexion :', error);
        this.deconnexionEnCours = false;
      },
      complete: () => {
        this.deconnexionEnCours = false;
      }
    });
  }

  obtenirInitiales(prenom?: string, nom?: string): string {
    const initialePrenom = prenom?.trim().charAt(0) ?? '';
    const initialeNom = nom?.trim().charAt(0) ?? '';

    return `${initialePrenom}${initialeNom}`.toUpperCase() || 'U';
  }

  obtenirRole(role?: string): string {
    switch (role) {
      case 'PSYCHOLOGUE':
        return 'Psychologue';

      case 'ADMIN':
        return 'Administrateur';

      case 'CITOYEN':
        return 'Citoyen';

      default:
        return role ?? '';
    }
  }
}
