import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-navbar-layout",
  imports: [MatIconModule],
  templateUrl: "./navbar-layout.html",
  styleUrl: "./navbar-layout.css",
})
export class NavbarLayout implements OnInit{

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  titre = '';

  ngOnInit(): void {
    this.mettreAJourTitre();

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.mettreAJourTitre();
        });
  }

  private mettreAJourTitre(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.titre = route.data['title'] || 'Dashboard';
  }
}
