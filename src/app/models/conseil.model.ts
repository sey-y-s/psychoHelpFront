export type StatutConseil =
    | 'EN_ATTENTE'
    | 'VALIDER'
    | 'REFUSER';

export interface Conseil {
  id: number;
  titre: string;
  description: string;
  datePublication?: string;
  status: string;
  auteur: string

  psyNom: string
}