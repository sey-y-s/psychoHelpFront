import {ChangeDetectorRef, Component, inject} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {DashboardStats} from "./dashboard-stats/dashboard-stats";
import {ProchainsRendezVous} from "./prochains-rendez-vous/prochains-rendez-vous";
import {CreneauxDuJour} from "./creneaux-du-jour/creneaux-du-jour";
import {DashboardService} from "../../../core/services/dashboard.service";
import {AuthService} from "../../../core/services/auth.service";
import {DashboardData} from "../../../models/dashboard.model";
import {finalize} from "rxjs";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: "app-dashboard",
  imports: [MatIconModule,MatProgressSpinnerModule, MatSnackBarModule, DashboardStats, ProchainsRendezVous, CreneauxDuJour],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard {

  private readonly dashboardService = inject(DashboardService);

  private readonly authService = inject(AuthService);

  private readonly snackBar = inject(MatSnackBar);

  private readonly cdr = inject(ChangeDetectorRef);

  readonly currentUser$ = this.authService.currentUser$;

  dashboard: DashboardData | null = null;

  chargement = false;

  ngOnInit(): void {
    this.chargerDashboard();
  }

  recharger(): void {
    this.chargerDashboard();
  }

  private chargerDashboard(): void {
    this.chargement = true;

    this.dashboardService
        .chargerDashboard()
        .pipe(
            finalize(() => {
              this.chargement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: data => {
            this.dashboard = data;
          },

          error: error => {
            console.error(
                'Erreur de chargement du dashboard :',
                error
            );

            this.dashboard = null;

            this.snackBar.open(
                'Impossible de charger le tableau de bord.',
                'Fermer',
                {
                  duration: 3500,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                }
            );
          }
        });
  }

  obtenirDateFormatee(): string {
    return new Intl.DateTimeFormat(
        'fr-FR',
        {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
    ).format(new Date());
  }
}
