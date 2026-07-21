import {inject, Injectable} from "@angular/core";
import {SeanceService} from "./seance.service";
import {CreneauService} from "./creneau.service";
import {ConseilService} from "./conseil.service";
import {NotificationService} from "./NotificationService";
import {forkJoin, map, Observable} from "rxjs";
import {DashboardData} from "../../models/dashboard.model";
import {RendezVous} from "../../models/rendez-vous.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly seanceService = inject(SeanceService);
    private readonly creneauService = inject(CreneauService);
    private readonly conseilService = inject(ConseilService);
    private readonly notificationService = inject(NotificationService);

    chargerDashboard(): Observable<DashboardData> {
        return forkJoin({
            rendezVous: this.seanceService.getMesRendezVous(),
            creneaux: this.creneauService.getMesCreneaux(),
            conseils: this.conseilService.getMesConseils(),
            notificationsNonLues: this.notificationService.compterNonLues()
        }).pipe(
            map(resultat => {
                const aujourdHui = this.obtenirDateLocale();
                const jourActuel = this.obtenirJourActuel();

                const prochainsRendezVous = resultat.rendezVous
                    .filter(rdv =>
                        (
                            rdv.statut === 'RESERVER' ||
                            rdv.statut === 'CONFIRMER'
                        ) &&
                        rdv.dateRdv >= aujourdHui
                    )
                    .sort((a, b) =>
                        this.comparerRendezVous(a, b)
                    );

                const creneauxDuJour = resultat.creneaux
                    .filter(creneau =>
                        creneau.jours.toLowerCase() ===
                        jourActuel.toLowerCase()
                    )
                    .sort((a, b) =>
                        a.heureDebut.localeCompare(b.heureDebut)
                    );

                return {rendezVousAVenir: prochainsRendezVous.length,
                    creneauxDisponibles: resultat.creneaux.filter(creneau => creneau.statut).length,
                    conseilsPublies:
                    resultat.conseils.filter(conseil => conseil.statusConseil === 'VALIDER').length,
                    notificationsNonLues: resultat.notificationsNonLues,
                    prochainsRendezVous: prochainsRendezVous.slice(0, 3),
                    creneauxDuJour: creneauxDuJour.slice(0, 5)
                };
            })
        );
    }

    private comparerRendezVous(premier: RendezVous, second: RendezVous): number {
        const premierRdv = `${premier.dateRdv}T${premier.heureDebut}`;
        const secondRdv = `${second.dateRdv}T${second.heureDebut}`;
        return premierRdv.localeCompare(secondRdv);
    }

    private obtenirDateLocale(): string {
        const date = new Date();
        const annee = date.getFullYear();
        const mois = String(date.getMonth() + 1).padStart(2, '0');
        const jour = String(date.getDate()).padStart(2, '0');
        return `${annee}-${mois}-${jour}`;
    }

    private obtenirJourActuel(): string {
        const jours = [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi'
        ];
        return jours[new Date().getDay()];
    }
}