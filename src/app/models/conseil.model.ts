export type StatutConseil =
    | 'EN_ATTENTE'
    | 'VALIDER'
    | 'REFUSER';

export interface Conseil {
  id: number;
  titre: string;
  description: string;
  auteur: string;
  datePublication: string;
  statut: StatutConseil;
}