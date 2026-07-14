// TODO: Vérifier le format date/heure attendu par l'API

export interface seanceInterfaceRequest {
  citoyenId: number;
  creneauId: number;
  dateRdv: string;
}
export interface seanceInterfaceRequest2 {
  creneauId: number;
  dateRdv: string;
}
export interface SeanceInterfaceResponse {
  citoyenId: number;
  statut:boolean
  creneauId: number;
  dateRdv: string;
}

  
  