export type StatutConseil =
    | 'ENATTENTE'
    | 'VALIDER'
    | 'REFUSER';

export interface Conseil {
  id: number;
  titre: string;
  description: string;
  datePublication?: string;
  status: string;
  auteur: string
    voirplus?: boolean;
 psyNom: string
}

export interface ConseilAffiche {
  id: string;
  titre: string;
  description: string;
  auteur: string;
  psyNom: string;
}