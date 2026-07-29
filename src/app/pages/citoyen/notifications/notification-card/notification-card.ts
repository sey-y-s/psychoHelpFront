import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Notification} from "../../../../models/notification.model";

@Component({
  selector: "app-notification-card",
  imports: [DatePipe, MatIconModule],
  templateUrl: "./notification-card.html",
  styleUrl: "./notification-card.css",
})
export class NotificationCard {
  @Input({ required: true })
  notification!: Notification;

  @Output()
  ouvrir = new EventEmitter<Notification>();

  get icone(): string {
    switch (this.notification.type) {
      case 'RENDEZ_VOUS':
        return 'calendar_month';

      case 'CONSEIL':
        return 'tips_and_updates';

      default:
        return 'notifications';
    }
  }

  get classeType(): string {
    return this.notification.type === 'RENDEZ_VOUS'
        ? 'rendez-vous'
        : 'conseil';
  }
}
