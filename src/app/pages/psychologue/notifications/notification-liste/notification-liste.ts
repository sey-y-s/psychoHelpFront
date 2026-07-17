import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotificationCard} from "../notification-card/notification-card";
import {Notification} from "../../../../models/notification.model";


@Component({
  selector: "app-notification-liste",
  imports: [MatProgressSpinnerModule, NotificationCard],
  templateUrl: "./notification-liste.html",
  styleUrl: "./notification-liste.css",
})
export class NotificationListe {

  @Input()
  notifications: Notification[] = [];

  @Input()
  chargement = false;

  @Output()
  notificationCliquee = new EventEmitter<Notification>();
}
