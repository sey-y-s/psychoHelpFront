export type StatutRendezVous =
    | 'RESERVER'
    | 'CONFIRMER'
    | 'TERMINER'
    | 'ANNULER'
    | 'DISPONIBLE';

export interface RendezVous {
    id: number;
    dateRdv: string;
    statut: StatutRendezVous;

    nomCitoyen: string;
    prenomCitoyen: string;

    jour: string;
    heureDebut: string;
    heureFin: string;
}

export type FiltreRendezVous =
    | 'TOUS'
    | 'A_VENIR'
    | 'AUJOURD_HUI'
    | 'TERMINES'
    | 'ANNULES';
