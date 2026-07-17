// TODO: Vérifier si c'est correct
export interface Conseil {
  id?: number;
  psychologueId: number;
  titre: string;
  description: string;
  datePublication?: string;
  status: string;
  auteur: string

  psyNom: string
}