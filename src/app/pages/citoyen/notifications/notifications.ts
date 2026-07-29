import {ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from "@angular/core";
import {NotificationListes} from "./notification-liste/notification-liste";
import {NotificationFiltre} from "./notification-filtres/notification-filtres";
import {NotificationServices} from "../../../core/services/notification-service";
import {NotificationService} from "../../../core/services/notification.service";
import {NotificationWebsocketService} from "../../../core/services/notification-websocket.service";
import {FiltreNotification, Notification} from "../../../models/notification.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {finalize} from "rxjs";


@Component({
  selector: "app-notifications",
  imports: [NotificationListes,  NotificationFiltre],
  templateUrl: "./notifications.html",
  styleUrl: "./notifications.css",
})
export class Notifications implements OnInit {

  private  readonly notificationService = inject(NotificationServices);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly not = inject(NotificationService)

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
            this.not.erreur(error?.error?.message || 'Impossible de marquer la notification comme lue.');
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
            this.not.succes('Toutes les notifications ont été marquées comme lues.');
          },
          error: error => {
            console.error(error);
            this.not.erreur('Impossible de marquer toutes les notifications comme lues.');
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
            console.error('Erreur lors du chargement des notifications :', error);
            this.notifications = [];
            this.not.erreur('Impossible de charger les notifications.');
          }
        });
  }
}
