// TODO: Adapter les champs selon l'entité Utilisateur de l'API Spring Boot
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  mail: string;   // Facultatif pour les citoyens
  telephone?: string
  role: 'CITOYEN' | 'PSYCHOLOGUE' | 'ADMIN';
  token?: string;
}

export interface LoginRequest {
  identifiant: string;    // Email ou numéro de téléphone
  motDePasse: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  mail?: string;          // Facultatif
  telephone: string;      // Obligatoire
  motDePasse: string;
}