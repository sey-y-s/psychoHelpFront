import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseil } from '../../models/conseil.model';
import {environments} from "../../../environments/environments.development";
import { ConseilInfaceModelForPsy, ConseilInfaceModelForPsyRequest } from '../../models/citoyenforPsy.model';
import {ProfileModel} from "../../models/profile.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private readonly http = inject(HttpClient);

    getProfile(): Observable<ProfileModel>{
        console.log(`${this.http}/utilisateurs/session`)
        return this.http.get<ProfileModel>(`http://localhost:8080/api/utilisateurs/session`)
    }
}