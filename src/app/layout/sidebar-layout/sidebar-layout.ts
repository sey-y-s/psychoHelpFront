import {Component, inject} from "@angular/core";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: "app-sidebar-layout",
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: "./sidebar-layout.html",
  styleUrl: "./sidebar-layout.css",
})
export class SidebarLayout {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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
}
