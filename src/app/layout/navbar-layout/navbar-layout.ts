import {ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRouteSnapshot, NavigationEnd, PRIMARY_OUTLET, Router} from "@angular/router";
import {filter} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {NotificationService} from "../../core/services/NotificationService";
import {NotificationWebsocketService} from "../../core/services/notification-websocket.service";

@Component({
  selector: "app-navbar-layout",
  imports: [MatIconModule, AsyncPipe],
  templateUrl: "./navbar-layout.html",
  styleUrl: "./navbar-layout.css",
})
export class NavbarLayout implements OnInit{

  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly notificationService = inject(NotificationService);
  private readonly notificationWebsocketService = inject(NotificationWebsocketService);
  readonly nombreNotificationsNonLues$ = this.notificationWebsocketService.notificationsNonLues$;

  titre = '';

  ngOnInit(): void {
    this.mettreAJourTitre();

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.mettreAJourTitre();
        });

    this.notificationService.compterNonLues().subscribe(nombre => {
      this.notificationWebsocketService.definirNombreNonLues(nombre);
    });
  }

  private mettreAJourTitre(): void {
    let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let titreTrouve: string | undefined;

    while (route) {
      if (route.outlet === PRIMARY_OUTLET) {
        titreTrouve = route.data['title'] ?? titreTrouve;
      }

      route = route.firstChild;
    }

    this.titre = titreTrouve || 'Dashboard';
    this.changeDetectorRef.detectChanges();
  }
}
