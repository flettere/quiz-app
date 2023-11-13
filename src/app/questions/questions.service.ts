import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private _http: HttpClient) { }

  getQuestionsByTopic(topic: string | undefined) {
    return this._http.get<Question[]>(`/assets/data/${topic}-questions.json`);
  }
}
