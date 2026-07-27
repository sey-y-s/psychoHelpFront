export interface TestEvaluation {
  id: number;
  nom_test: string;
  description: string;
  nomCategorie: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  choix: OptionChoix[];
}

export interface OptionChoix {
  id: number;
  choix: string;
  score: number;
}

