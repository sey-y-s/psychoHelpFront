import { InscriptionUtilisateur } from "./inscription.model";

export interface Psychologue extends InscriptionUtilisateur {
  id: number;
  description: string;
  cv_path: string;
  diplome_path: string;
  // specialite: string;
  role: string;
  dateCreation: string;
  status: boolean;
  etat: boolean;
}
