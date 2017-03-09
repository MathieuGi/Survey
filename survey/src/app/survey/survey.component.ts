import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { QuestionService } from '../services/question/question.service';
import { SurveyService } from '../services/survey/survey.service';
import { Survey } from '../shared/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  private survey: Survey;

  private questionsId: Object[];

  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.surveyService.getSurvey(params['token']))
      .subscribe(survey => {
        console.log(survey);
        this.survey = survey;
        this.getQuestionsId(survey.survey.id);
      });
  }

  private getQuestionsId = function (id: number) {
    this.route.params
      .switchMap((params: Params) => this.questionService.getQuestionsId(params['token'], id))
      .subscribe(questionsId => {
        this.questionsId = questionsId;
        console.log(this.questionsId)
      });
  }

}
