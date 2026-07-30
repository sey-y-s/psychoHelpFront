import { Injectable } from '@angular/core';
import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import { Notification } from '../../models/notification.model';
import { environments } from '../../../environments/environments.development';

@Injectable({
    providedIn: 'root'
})
export class NotificationWebsocketService {

    private client: Client | null = null;
    private abonnement: StompSubscription | null = null;
    private utilisateurIdConnecte: number | null = null;

    private readonly notificationSubject = new Subject<Notification>();
    readonly notification$ = this.notificationSubject.asObservable();
    private readonly notificationsNonLuesSubject = new BehaviorSubject<number>(0);
    readonly notificationsNonLues$ = this.notificationsNonLuesSubject.asObservable();

    connecter(utilisateurId: number): void {
        if (this.client?.active && this.utilisateurIdConnecte === utilisateurId) {
            return;
        }
        if (this.client?.active && this.utilisateurIdConnecte !== utilisateurId) {
            this.deconnecter();
        }
        this.utilisateurIdConnecte = utilisateurId;
        this.client = new Client({
            brokerURL: environments.wsUrl,
            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            onConnect: () => {
                this.abonnement?.unsubscribe();
                this.abonnement = this.client?.subscribe(
                    `/topic/notifications/${utilisateurId}`,
                    (message: IMessage) => {
                        try {
                            const notification =
                                JSON.parse(message.body) as Notification;
                            this.notificationSubject.next(notification);
                            if (!notification.lu) {
                                this.incrementerNombreNonLues();
                            }
                        } catch (error) {
                            console.error(
                                'Notification WebSocket invalide :',
                                error
                            );
                        }
                    }
                ) ?? null;
            },
            onStompError: frame => {
                console.error(
                    'Erreur STOMP :',
                    frame.headers['message'],
                    frame.body
                );
            },
            onWebSocketError: error => {
                console.error(
                    'Erreur WebSocket :',
                    error
                );
            }
        });
        this.client.activate();
    }

    deconnecter(): void {
        this.abonnement?.unsubscribe();
        this.abonnement = null;
        if (this.client) {
            void this.client.deactivate();
        }
        this.client = null;
        this.utilisateurIdConnecte = null;
    }

    definirNombreNonLues(nombre: number): void {
        this.notificationsNonLuesSubject.next(nombre);
    }

    incrementerNombreNonLues(): void {
        this.notificationsNonLuesSubject.next(
            this.notificationsNonLuesSubject.value + 1
        );
    }

    decrementerNombreNonLues(): void {
        this.notificationsNonLuesSubject.next(
            Math.max(0, this.notificationsNonLuesSubject.value - 1)
        );
    }
}