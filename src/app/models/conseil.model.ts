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
  titre: string;
  description: string;
  auteur: string;
  psyNom: string;
}