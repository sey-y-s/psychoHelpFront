import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.development';
import { 
    questionRequestInterface, 
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
    private readonly apiUrle2 = `${environments.apiUrl}/tests`;

    // ============================================================
    // QUESTIONS
    // ============================================================

    public getAllQuestion(test_id: number) {
        return this.http.get<questionResponseInterface[]>(
            `${this.apiUrle2}/${test_id}/questions`,
            { withCredentials: true }
        );
    }

    public ajouterQuestion(question: questionRequestInterface) {
        return this.http.post<questionResponseInterface>(
            `${this.apiUrl}/moussa`,
            question,
            { withCredentials: true }
        );
    }

    public getQuestion(id: number) {
        return this.http.get<questionResponseInterfaceModif>(
            `${this.apiUrl}/moussa/${id}`,
            { withCredentials: true }
        );
    }

    public modifierQuestion(id: number, question: questionRequestInterface) {
        return this.http.put<questionResponseInterface>(
            `${this.apiUrl}/moussa/${id}`,
            question,
            { withCredentials: true }
        );
    }

    public delete(id: number) {
        return this.http.delete<string>(
            `${this.apiUrl}/${id}`,
            { withCredentials: true }
        );
    }

    // ============================================================
    // CHOIX
    // ============================================================

    public getChoixByQuestion(questionId: number) {
        return this.http.get<choixResponseInterface[]>(
            `${this.apiUrl}/${questionId}/choix`,
            { withCredentials: true }
        );
    }

    public ajouterChoix(questionId: number, choix: choixRequestInterface) {
        return this.http.post<choixResponseInterface>(
            `${this.apiUrl}/${questionId}/choix`,
            choix,
            { withCredentials: true }
        );
    }

    public ajouterChoixMultiple(questionId: number, choixList: choixRequestInterface[]) {
        return this.http.post<choixResponseInterface[]>(
            `${this.apiUrl}/${questionId}/choix/multiple`,
            choixList,
            { withCredentials: true }
        );
    }

    public modifierChoix(choixId: number, choix: choixRequestInterface) {
        return this.http.put<choixResponseInterface>(
            `${this.apiUrl}/choix/${choixId}`,
            choix,
            { withCredentials: true }
        );
    }

    public supprimerChoix(choixId: number) {
        return this.http.delete<string>(
            `${this.apiUrl}/choix/${choixId}`,
            { withCredentials: true }
        );
    }

    public supprimerTousChoix(questionId: number) {
        return this.http.delete<string>(
            `${this.apiUrl}/${questionId}/choix`,
            { withCredentials: true }
        );
    }
}