export interface User{
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;

}
export interface DashboardStats{
    TotalRdv:number;
    TotalUtilisateur:number;
    TotalConseil:number;
    TotalTest:number;
    utilisateursRecent:User[]
}