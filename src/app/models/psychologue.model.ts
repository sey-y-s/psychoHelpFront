import { InscriptionUtilisateur } from "./inscription.model";

export interface Psychologue extends InscriptionUtilisateur {
  description: string;
  cv_path: string;
  diplome_path: string;
  idSpecialite?: number;
  specialite?: string;
  role?: string;
  dateCreation?: string;
  status?: boolean;
  etat?: boolean;
}
