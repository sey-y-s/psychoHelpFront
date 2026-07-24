// TODO: Adapter les champs selon l'entité Utilisateur de l'API Spring Boot
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  mail: string;
  role: 'CITOYEN' | 'PSYCHOLOGUE' | 'ADMIN';
  token?: string;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
}