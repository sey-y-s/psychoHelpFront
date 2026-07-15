// src/app/models/psychologue-liste.model.ts


export interface PsychologueListeDto {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    mail: string;
    role: 'PSYCHOLOGUE';
    dateCreation: Date;
    status: boolean;
    description: string;
    diplome_path: string;
    cv_path: string;
    etat: boolean;

    specialite: string;
}
