import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments.development";
import {Observable} from "rxjs";
import {Notification} from "../../models/notification.model";


@Injectable({
    providedIn: 'root'
})
export class NotificationServices {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environments.apiUrl}/notifications`;

    getMesNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}`);
    }

    getNotificationsNonLue(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/non-lues`)
    }

    compterNonLues(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/nombre-non-lues`)
    }

    marquerCommeLue(id: number): Observable<Notification> {
        return this.http.put<Notification>(`${this.apiUrl}/${id}/lu`,{})
    }

    toutMarquerCommeLu(): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/tout-lu`,{})
    }
}