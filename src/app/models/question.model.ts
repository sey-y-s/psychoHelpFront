// ============================================================
// MODÈLES POUR LES QUESTIONS
// ============================================================

export interface questionRequestInterface {
    test_id: number;
    question: string;
    choix?: choixRequestInterface[];
}

export interface questionResponseInterface {
    id: number;
    question: string;
    nom_test: string;
    choix?: choixResponseInterface[];
}

export interface questionResponseInterfaceModif {
    id: number;
    question: string;
    test_id: number;
    choix?: choixResponseInterface[];
}

// ============================================================
// MODÈLES POUR LES CHOIX
// ============================================================

export interface choixRequestInterface {
    texte: string;
    estCorrect: boolean;
    score?: number;
}

export interface choixResponseInterface {
    id: number;
    texte: string;
    estCorrect: boolean;
    score: number;
    questionId: number;
}

export interface choixModifRequestInterface {
    id?: number;
    texte: string;
    estCorrect: boolean;
    score?: number;
}