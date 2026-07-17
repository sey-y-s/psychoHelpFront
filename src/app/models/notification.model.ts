export type TypeNotification =
    | 'COMPTE'
    | 'RENDEZ_VOUS'
    | 'CONSEIL';

export interface Notification {
    id: number;
    titre: string;
    message: string;
    type: TypeNotification;
    lu: boolean;
    dateCreation: string;
}

export type FiltreNotification =
    | 'TOUTES'
    | 'NON_LUES'
    | 'RENDEZ_VOUS'
    | 'CONSEIL';