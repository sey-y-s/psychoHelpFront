import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {NotificationResponseDTO} from "../../../models/notification.admin.model";
import {NotificationService} from "../../../core/services/notification.service.admin";
import { DatePipe, CommonModule} from '@angular/common';

@Component({
  selector: "app-notification",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./notification.html",
  styleUrl: "./notification.css",
})
export class Notification implements OnInit {
  notifications: NotificationResponseDTO[] = [];
  nombreNonLues: number = 0;

  constructor(
      private notificationService: NotificationService,
      private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.chargerNotifications();
    this.chargerNombreNonLues();
  }

  chargerNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data.filter(notif => notif.type !== "RENDEZ_VOUS")
        //noob_saybot = this.notifications
        this.notifications.sort(
            (a, b) => {
              return (a.lu ? 1 : 0) - (b.lu ? 1 : 0);
            }
        )
        console.log(this.notifications)
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erreur lors du chargement des notifications', err)
    });
  }

  chargerNombreNonLues(): void {
    this.notificationService.getNombreNonLues().subscribe({
      next: (count) => this.nombreNonLues = count,
      error: (err) => console.error('Erreur lors du comptage', err)
    });
  }

  lireNotification(id: number): void {
    this.notificationService.marquerCommeLue(id).subscribe({
      next: () => {
        const notif = this.notifications.find(n => n.id === id);
        if (notif && !notif.lu) {
          notif.lu = true;
          this.nombreNonLues--;
        }
      },
      error: (err) => console.error('Erreur lors du marquage comme lu', err)
    });
  }

  marquerToutesCommeLues(): void {
    this.notificationService.toutLire().subscribe({
      next: () => {
        this.notifications.forEach(n => n.lu = true);
        this.nombreNonLues = 0;
      },
      error: (err) => console.error('Erreur lors du marquage global', err)
    });
  }
}
