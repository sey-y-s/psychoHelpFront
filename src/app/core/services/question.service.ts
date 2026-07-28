import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.development';
import { questionRequestInterface, questionResponseInterface, questionResponseInterfaceModif } from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environments.apiUrl}/questions`;
    private readonly apiUrle2 = `${environments.apiUrl}/tests`;

   public getAllQuestion(test_id:number){
    return this.http.get<questionResponseInterface[]>(`${this.apiUrle2}/${test_id}/questions`,{withCredentials:true})
  }

  public ajouterQuestion(question:questionRequestInterface){
    return this.http.post<questionResponseInterface>(`${this.apiUrl}/moussa`,question,{withCredentials:true})
  }
   public getQuestion(id:number){
    return this.http.get<questionResponseInterfaceModif>(`${this.apiUrl}/moussa/${id}`,{withCredentials:true})
  }
   public modifierQuestion(id:number,question:questionRequestInterface){
    return this.http.put<questionResponseInterface>(`${this.apiUrl}/moussa/${id}`,question,{withCredentials:true})
  }
   public delete(id:number){
    return this.http.delete<string>(`${this.apiUrl}/${id}`,{withCredentials:true})
  }


}