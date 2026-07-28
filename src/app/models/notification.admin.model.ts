export type NotificationType = 'COMPTE' | 'CONSEIL' | 'RENDEZ_VOUS';

export interface NotificationResponseDTO {
    id: number;
    lu: boolean;
    utilisateurId: number;
    dateCreation: string;
    message: string;
    titre: string;
    type: NotificationType;
}
