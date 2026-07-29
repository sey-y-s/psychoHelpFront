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
    choix: string;
    score: number;
    estCorrect?: boolean;
}

export interface choixResponseInterface {
    id: number;
    choix: string;
    score: number;
    question: string;
    questionId?: number;
    estCorrect?: boolean;
}