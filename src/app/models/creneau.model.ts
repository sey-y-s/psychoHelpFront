export interface Creneau {
  id: number;
  jours: string;
  heureDebut: string;
  heureFin: string;
  statut: boolean;
  nomPsychologue?: string;
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