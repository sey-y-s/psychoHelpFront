// TODO: Vérifier si c'est correct
export interface Conseil {
  id?: number;
  psychologueId: number;
  titre: string;
  contenu: string;
  datePublication?: string;
  valide: boolean;
}