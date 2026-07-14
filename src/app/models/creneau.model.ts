// TODO: Vérifier le format date/heure attendu par l'API
export interface Creneau {
  id?: number;
  psychologueId: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  disponible: boolean;
}
export interface CreneauInterfaceResponse {
    id:number;
    jours:string;
    heureDebut:string;
    heureFin:string;
    statut:boolean;
    nomPsychologue:string;
}
export interface CreneauInterfaceResponse2 {
  jours:string
  heureDebut:string
  heureFin:string
  creneauId: number;
  psyId: number;
  date: string;
  nomPsychologue:string
}