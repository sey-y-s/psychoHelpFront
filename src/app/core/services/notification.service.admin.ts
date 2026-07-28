import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationResponseDTO } from '../../models/notification.admin.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://localhost:8080/api/notifications';

    private httpOptions = { withCredentials: true };

    constructor(private http: HttpClient) {}

    getNotifications(): Observable<NotificationResponseDTO[]> {
        return this.http.get<NotificationResponseDTO[]>(this.apiUrl, this.httpOptions);
    }

    getNotificationsNonLues(): Observable<NotificationResponseDTO[]> {
        return this.http.get<NotificationResponseDTO[]>(`${this.apiUrl}/non-lues`, this.httpOptions);
    }

    getNombreNonLues(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/nombre-non-lues`, this.httpOptions);
    }

    marquerCommeLue(id: number): Observable<NotificationResponseDTO> {
        return this.http.put<NotificationResponseDTO>(`${this.apiUrl}/${id}/lu`, {}, this.httpOptions);
    }

    toutLire(): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/tout-lu`, {}, this.httpOptions);
    }
}
