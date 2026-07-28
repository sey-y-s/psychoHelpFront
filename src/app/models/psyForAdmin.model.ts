import { InscriptionUtilisateur } from "./inscription.model";

export interface Psychologue extends InscriptionUtilisateur {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  mail: string;
  role: string;
  dateCreation: string;
  status: string;        // true = activé, false = désactivé
  description: string;
  diplomePath: string;
  cvPath: string;
  etat: boolean;          // true = validé, false = en attente
  specialite: string;     // ← AJOUTÉ (présent dans le DTO)
}