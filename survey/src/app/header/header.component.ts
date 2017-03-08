import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Survey } from '../shared/Survey';
import { SurveyService } from '../services/survey/survey.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private survey: Survey;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.surveyService.getForm(params['token']))
      .subscribe(survey => {
        console.log(survey);
        this.survey = survey
      });
  }

}
