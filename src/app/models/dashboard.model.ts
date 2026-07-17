import {RendezVous} from "./rendez-vous.model";
import {Creneau} from "./creneau.model";

export interface DashboardData {
    rendezVousAVenir: number;
    creneauxDisponibles: number;
    conseilsPublies: number;
    notificationsNonLues: number;

    prochainsRendezVous: RendezVous[];
    creneauxDuJour: Creneau[];
}