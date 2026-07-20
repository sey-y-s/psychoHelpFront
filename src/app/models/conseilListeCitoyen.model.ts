// TODO: Vérifier si c'est correct
export interface ConseilListeCitoyen {
  id?: number;
  titre: string;
  description: string;
  datePublication?: string;
  status: string;
  auteur: string

  psyNom: string;
  voirplus:boolean;
}