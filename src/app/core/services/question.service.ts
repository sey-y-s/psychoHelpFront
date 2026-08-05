import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.development';
import { 
    questionResponseInterface, 
    questionResponseInterfaceModif,
    choixRequestInterface,
    choixResponseInterface
} from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environments.apiUrl}/questions`;
    private readonly apiTestsUrl = `${environments.apiUrl}/tests`;
    private readonly apiChoixUrl = `${environments.apiUrl}/choix`;

    // ============================================================
    // QUESTIONS
    // ============================================================

    public getAllQuestion(test_id: number) {
        return this.http.get<questionResponseInterface[]>(
            `${this.apiTestsUrl}/${test_id}/questions`
        );
    }

    public getQuestion(id: number) {
        return this.http.get<questionResponseInterfaceModif>(
            `${this.apiUrl}/moussa/${id}`
            
        );
    }

    public ajouterQuestion(question: any) {
        return this.http.post<questionResponseInterface>(
            `${this.apiUrl}/moussa`,
            question
            
        );
    }

    public modifierQuestion(id: number, question: any) {
        return this.http.put<questionResponseInterface>(
            `${this.apiUrl}/moussa/${id}`,
            question
        );
    }

    public delete(id: number) {
        return this.http.delete<string>(
            `${this.apiUrl}/${id}`
        );
    }

    // ============================================================
    // CHOIX
    // ============================================================

    public getChoixByQuestion(questionId: number) {
    const params = new URLSearchParams();
    params.set('question_id', questionId.toString());
    return this.http.get<choixResponseInterface[]>(
        `${this.apiChoixUrl}?${params.toString()}`,
        
    );
}

    public ajouterChoix(questionId: number, choix: choixRequestInterface) {
        const params = new URLSearchParams();
        params.set('question_id', questionId.toString());
        return this.http.post<choixResponseInterface>(
            `${this.apiChoixUrl}?${params.toString()}`,
            choix,
            
        );
    }

    public modifierChoix(choixId: number, choix: choixRequestInterface) {
        return this.http.put<choixResponseInterface>(
            `${this.apiChoixUrl}/${choixId}`,
            choix,
            
        );
    }

    public supprimerChoix(choixId: number) {
        return this.http.delete<string>(
            `${this.apiChoixUrl}/${choixId}`,
            
        );
    }

    /**
     * Supprimer tous les choix d'une question
     * Cette méthode récupère d'abord tous les choix de la question,
     * puis les supprime un par un
     */
    public supprimerTousChoix(questionId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            // 1. Récupérer tous les choix
            this.getChoixByQuestion(questionId).subscribe({
                next: (choixList) => {
                    if (choixList.length === 0) {
                        resolve();
                        return;
                    }
                    
                    // 2. Supprimer chaque choix
                    let completed = 0;
                    choixList.forEach(choix => {
                        this.supprimerChoix(choix.id).subscribe({
                            next: () => {
                                completed++;
                                if (completed === choixList.length) {
                                    resolve();
                                }
                            },
                            error: (err) => {
                                console.error('Erreur suppression choix:', err);
                                reject(err);
                            }
                        });
                    });
                },
                error: (err) => {
                    console.error('Erreur récupération des choix:', err);
                    reject(err);
                }
            });
        });
    }
}