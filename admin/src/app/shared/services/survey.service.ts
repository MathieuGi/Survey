import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Survey } from '../survey';
import { Question } from '../question';

@Injectable()
export class SurveyService {

  private headers = new Headers({ 'content-type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  createSurvey(survey: Survey): Promise<number> {
    const URL = "http://localhost:3000/admin/createSurvey";

    return this.http.post(URL, survey, this.options)
      .toPromise()
      .then((insertId) => insertId.json())
      .catch((err) => "Error when creating survey : " + err);
  }

  addQuestions(insertId: number, question: Question): Promise<string> {
    const URL = "http://localhost:3000/admin/createQuestion";


    return this.http.post(URL, {'question' : [question.question, insertId]}, this.options)
      .toPromise()
      .then(() => "Question added")
      .catch((err) => "Error when adding question : " + err);
  }

}
