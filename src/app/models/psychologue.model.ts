// TODO: Vérifier la correspondance avec l'entité Psychologue du backend
export interface Psychologue {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite: string;
  biographie?: string;
  photoUrl?: string;
  valide: boolean;
}