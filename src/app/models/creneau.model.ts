// TODO: Vérifier le format date/heure attendu par l'API
export interface Creneau {
  id?: number;
  psychologueId: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  disponible: boolean;
}

export interface Seance {
  id?: number;
  citoyenId: number;
  creneauId: number;
  psychologueId: number;
  date: string;
  statut: 'CONFIRME' | 'ANNULE' | 'TERMINE';
}