import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {SidebarLayout} from "../sidebar-layout/sidebar-layout";
import {NavbarLayout} from "../navbar-layout/navbar-layout";
import {AuthService} from "../../core/services/auth.service";
import {NotificationWebsocketService} from "../../core/services/notification-websocket.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-main-layout",
  imports: [ RouterOutlet, SidebarLayout, NavbarLayout],
  templateUrl: "./main-layout.html",
  styleUrl: "./main-layout.css",
})
export class MainLayout implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly notificationWebsocketService = inject(NotificationWebsocketService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.authService.currentUser$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(utilisateur => {
          const utilisateurId = utilisateur?.id;
          if (utilisateurId != null) {
            this.notificationWebsocketService.connecter(utilisateurId);
          } else {
            this.notificationWebsocketService.deconnecter();
          }
        });
  }
}
