export interface User{
    id: number;
    nom: string;
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