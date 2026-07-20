import { InscriptionUtilisateur } from "./inscription.model";

export interface Psychologue extends InscriptionUtilisateur {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  mail: string;
  role: string;
  dateCreation: string;
  status: boolean;        // true = activé, false = désactivé
  description: string;
  diplome_path: string;
  cv_path: string;
  etat: boolean;          // true = validé, false = en attente
  specialite: string;     // ← AJOUTÉ (présent dans le DTO)
}