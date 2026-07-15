export interface Creneau {
  id: number;
  jours: string;
  heureDebut: string;
  heureFin: string;
  statut: boolean;
  nomPsychologue?: string;
}

export interface CreneauRequest {
  jours: string;
  heureDebut: string;
  heureFin: string;
  statut: boolean;
}
export interface UpdateCreneauRequest {
  id: number;
  jours: string;
  heureDebut: string;
  heureFin: string;
  statut: boolean;
}