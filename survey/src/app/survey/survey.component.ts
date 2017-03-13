import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { QuestionService } from '../services/question/question.service';
import { SurveyService } from '../services/survey/survey.service';
import { Survey } from '../shared/survey';
import { Question } from '../shared/question';
import { Answer } from '../shared/answer';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  private survey: Survey;

  private questionsId: Object[];
  private answers: Answer[] = [];

  constructor(
    private questionService: QuestionService,
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.surveyService.getSurvey(params['token']))
      .subscribe(survey => {
        if (survey) {
          this.survey = survey;
          this.getQuestionsId(survey.survey.id);
        } else {
<<<<<<< HEAD
          this.router.navigate(["/404"]);
=======
          this.router.navigate(["404"]);
>>>>>>> dfdceead0d9e012b116bdbb33acbe2a7b0f18f70
        }
      });
  }

  private getQuestionsId(id: number) {
    this.route.params
      .switchMap((params: Params) => this.questionService.getQuestionsId(id))
      .subscribe(questionsId => {
        this.questionsId = questionsId;
      });
  }

  onSelectedAnswer(answer: Answer) {
    for (let i = 0; i < this.answers.length; i += 1) {
      if (this.answers[i].id === answer.id) {
        this.answers[i] = answer;
        console.log(this.answers)
        return;
      }
    }
    this.answers.push(answer);
    return;
  }

  private submitSurvey() {
    this.route.params.switchMap((params: Params) =>
      this.questionService.putAnswers(params['token'], this.answers))
      .subscribe((res) => {
        if(res){
          this.router.navigate(['/survey-posted']);
        }
      });

  }

}
