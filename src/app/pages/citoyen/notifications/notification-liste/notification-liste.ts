import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Notification} from "../../../../models/notification.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotificationCard} from "../notification-card/notification-card";

@Component({
  selector: "app-notification-listes",
  imports: [MatProgressSpinnerModule, NotificationCard, NotificationCard],
  templateUrl: "./notification-liste.html",
  styleUrl: "./notification-liste.css",
})
export class NotificationListes {

  @Input()
  notifications: Notification[] = [];

  @Input()
  chargement = false;

  @Output()
  notificationCliquee = new EventEmitter<Notification>();
}
