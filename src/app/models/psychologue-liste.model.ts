// src/app/models/psychologue-liste.model.ts

import { Specialite } from "./specialite.model";


//export type StatusValidationPsy = 'ENATTENTE' | 'VALIDER' | 'REFUSER';


export interface PsychologueListeDto {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    mail: string;
    role: 'PSYCHOLOGUE';
    dateCreation: Date;
    status: string;
    description: string;
    diplome_path: string;
    cv_path: string;
    etat: boolean;

    specialite: string;
}
