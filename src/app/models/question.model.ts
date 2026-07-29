export interface questionRequestInterface{
    test_id:number
    question:string
}
export interface questionResponseInterface{
    id:number
    question:string,
    nom_test:string
}
export interface questionResponseInterfaceModif{
    id:number
    question:string,
    test_id:number
}
