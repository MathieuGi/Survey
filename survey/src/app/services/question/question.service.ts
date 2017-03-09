import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from '../../shared/question'

@Injectable()
export class QuestionService {

  private headers = new Headers({ 'Content-type': 'application/json' });

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);  // for demo purpose only
    return Promise.reject(error.message || error);
  }

  getQuestionsId( surveyId: number): Promise<number[]> {
    const URL = "http://localhost:3000/api/questionsId/" + surveyId;

    return this.http.get(URL)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getQuestionById(questionId: number): Promise<Question> {
    const URL = "http://localhost:3000/api/question/" + questionId;

    return this.http.get(URL)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }

}
