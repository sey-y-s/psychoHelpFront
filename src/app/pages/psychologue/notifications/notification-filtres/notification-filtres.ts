import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FiltreNotification} from "../../../../models/notification.model";
import {MatIconModule} from "@angular/material/icon";

interface FiltreOption {
  valeur: FiltreNotification;
  libelle: string;
}
@Component({
  selector: "app-notification-filtres",
  imports: [MatIconModule],
  templateUrl: "./notification-filtres.html",
  styleUrl: "./notification-filtres.css",
})
export class NotificationFiltres {

  @Input()
  filtreActif: FiltreNotification = 'TOUTES';

  @Input()
  traitement = false;

  @Input()
  possedeNotificationsNonLues = false;

  @Output()
  filtreChange = new EventEmitter<FiltreNotification>();

  @Output()
  toutMarquerLu = new EventEmitter<void>();

  readonly filtres: FiltreOption[] = [
    {
      valeur: 'TOUTES',
      libelle: 'Toutes'
    },
    {
      valeur: 'NON_LUES',
      libelle: 'Non lues'
    },
    {
      valeur: 'RENDEZ_VOUS',
      libelle: 'Rendez-vous'
    },
    {
      valeur: 'CONSEIL',
      libelle: 'Conseils'
    }
  ];

  selectionner(filtre: FiltreNotification): void {
    this.filtreChange.emit(filtre);
  }
}
