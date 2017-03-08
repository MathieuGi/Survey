import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Survey } from '../../shared/survey';

@Injectable()
export class SurveyService {

  private headers = new Headers({ 'content-type': 'application/json' });
  
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);  // for demo purpose only
    return Promise.reject(error.message || error);
  }

  getForm(token: string): Promise<Survey> {
    let options = new RequestOptions({ headers: this.headers });
    const URL = "http://localhost:3000/api/" + token + "/survey";
    
      return this.http.get(URL, options)
      .toPromise()
      .then(response => response.json() as Survey)
      .catch(this.handleError);
  }

}
