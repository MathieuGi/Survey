import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from '../../shared/question';
import {Answer} from '../../shared/answer';

@Injectable()
export class QuestionService {

  private headers = new Headers({ 'Content-type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });


  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);  // for demo purpose only
    return Promise.reject(error.message || error);
  }

  getQuestionsId(surveyId: number): Promise<Question[]> {
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

  getQuestionInfosById(questionId: number): Promise<Question> {
    const URL = "http://localhost:3000/admin/results/" + questionId;

    return this.http.get(URL)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }

  putAnswers(token: string, answers: Answer[]) {
    const URL = "http://localhost:3000/api/survey/" + token + "/put-answer";

    return this.http.put(URL, {answers} , this.options)
    .toPromise()
    .then(() => true)
    .catch(this.handleError);
  }

}
