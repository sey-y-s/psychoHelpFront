import { InscriptionUtilisateur } from "./inscription.model";

// TODO: Vérifier la correspondance avec l'entité Psychologue du backend
export interface Psychologue extends InscriptionUtilisateur {
   description: string;
  cv_path: string;
  diplome_path: string;
  idSpecialite: number;
}