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
  creneauId: number;
  dateRdv: string;
}

// Psychologue affiché dans le rendez-vous
export interface PsychologueRdv {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
}

// Créneau du rendez-vous
export interface CreneauRdv {
  id: number;
  jours: string;
  heureDebut: string;
  heureFin: string;
  statut: boolean;
  psychologue: PsychologueRdv;
}
export interface SeanceDashboard {
  id: number;
  date: string;
  dateRdv: string;
  statut: string;
  creneau: CreneauRdv;
}

export interface CitoyenRendezVousResponse {

  id: number;

  nomPsychologue: string;

  prenomPsychologue: string;

  specialite: string;

  dateRdv: string;

  heureDebut: string;

  heureFin: string;

  statut: string;

}
  
  