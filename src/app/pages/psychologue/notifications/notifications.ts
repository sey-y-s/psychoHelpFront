import {ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from "@angular/core";
import {NotificationService} from "../../../core/services/NotificationService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FiltreNotification, Notification} from "../../../models/notification.model";
import {finalize, Subject} from "rxjs";
import {NotificationListe} from "./notification-liste/notification-liste";
import {NotificationFiltres} from "./notification-filtres/notification-filtres";
import {NotificationWebsocketService} from "../../../core/services/notification-websocket.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: "app-notifications",
  imports: [NotificationListe, NotificationFiltres],
  templateUrl: "./notifications.html",
  styleUrl: "./notifications.css",
})
export class Notifications implements OnInit {

  private  readonly notificationService = inject(NotificationService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly notificationWebsocketService = inject(NotificationWebsocketService);
  private readonly destroyRef = inject(DestroyRef)

  notifications: Notification[] = [];
  filtreActif: FiltreNotification = 'TOUTES';

  chargement = false;
  traitement = false;

  ngOnInit(): void {
    this.chargerNotifications();

    this.notificationWebsocketService.notification$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(notification => {
          const existeDeja = this.notifications.some(
              element => element.id === notification.id
          );
          if (!existeDeja) {
            this.notifications = [
              notification,
              ...this.notifications
            ];
            this.cdr.detectChanges();
          }
        });
  }

  get notificationsFiltrees(): Notification[] {
    switch (this.filtreActif) {
      case 'NON_LUES':
        return this.notifications.filter(
            notification => !notification.lu
        );
      case 'RENDEZ_VOUS':
        return this.notifications.filter(
            notification =>
                notification.type === 'RENDEZ_VOUS'
        );
      case 'CONSEIL':
        return this.notifications.filter(
            notification =>
                notification.type === 'CONSEIL'
        );
      default:
        return this.notifications;
    }
  }

  changerFiltre(filtre: FiltreNotification): void {
    this.filtreActif = filtre;
  }

  marquerCommeLue(notification: Notification): void {
    if (notification.lu || this.traitement) {
      return;
    }
    this.traitement = true;
    this.notificationService
        .marquerCommeLue(notification.id)
        .pipe(
            finalize(() => {
              this.traitement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: notificationModifiee => {
            this.notifications =
                this.notifications.map(element =>
                    element.id === notificationModifiee.id
                        ? notificationModifiee
                        : element
                );
              this.notificationWebsocketService.decrementerNombreNonLues();

          },
          error: error => {
            console.error(error);

            this.afficherMessage(
                'Impossible de marquer la notification comme lue.'
            );
          }
        });
  }

  toutMarquerCommeLu(): void {
    if (this.traitement || !this.notifications.some(notification => !notification.lu)) {
      return;
    }
    this.traitement = true;
    this.notificationService
        .toutMarquerCommeLu()
        .pipe(
            finalize(() => {
              this.traitement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: () => {
            this.notifications =
                this.notifications.map(notification => ({
                  ...notification,
                  lu: true
                }));
            this.notificationWebsocketService.definirNombreNonLues(0);
              this.afficherMessage(
                'Toutes les notifications ont été marquées comme lues.'
            );
          },
          error: error => {
            console.error(error);

            this.afficherMessage(
                'Impossible de marquer toutes les notifications comme lues.'
            );
          }
        });
  }

  private chargerNotifications(): void {
    this.chargement = true;
    this.notificationService.getMesNotifications()
        .pipe(
            finalize(() => {
              this.chargement = false;
              this.cdr.detectChanges();
            })
        )
        .subscribe({
          next: (data: Notification[]) => {
            this.notifications = data ?? [];
          },
          error: error => {
            console.error(
                'Erreur lors du chargement des notifications :',
                error
            );
            this.notifications = [];
            this.afficherMessage(
                'Impossible de charger les notifications.'
            );
          }
        });
  }

  private afficherMessage(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
