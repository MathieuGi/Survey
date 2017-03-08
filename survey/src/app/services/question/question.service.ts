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

  getQuestionsId(token: string, id_survey: number): Promise<number[]> {
    const URL = "api/" + token + "/questionsId/" + id_survey;

    return this.http.get(URL)
      .toPromise()
      .then(response => response.json().data as number[])
      .catch(this.handleError);
  }

  getQuestionById(token: string, id: number): Promise<Question> {
    const URL = "http://localhost:3000/api/" + token + "/question/" + id;

    return this.http.get(URL)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }

}
