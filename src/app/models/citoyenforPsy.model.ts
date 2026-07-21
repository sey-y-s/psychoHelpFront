export interface ConseilInfaceModelForPsy{
    id: number,
    titre: string,
    description: string,
    statusConseil: string,
    datePublication: string
  
}
export interface ConseilInfaceModelForPsyRequest{
    titre: string,
    description: string,
}