import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Survey } from '../../shared/survey';

@Injectable()
export class SurveyService {
  public test;

  private headers = new Headers({ 'content-type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private router: Router) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);  // for demo purpose only
    return Promise.reject(error.message || error);
  }

  getSurvey(token: string): Promise<Survey> {
    const URL = "http://localhost:3000/api/survey/" + token;

    return this.http.get(URL, this.options)
      .map((res) => res.json())
      .toPromise().then(data => {return data}, err => {return false});
        
       
  }

  getSurveyId(token: string): Observable<number> {
    const URL = "http://localhost:3000/api/survey/" + token;

    return this.http.get(URL, this.options)
      .map((res: Response) => {
        return res.json().survey_id as number;
      });
  }

}
