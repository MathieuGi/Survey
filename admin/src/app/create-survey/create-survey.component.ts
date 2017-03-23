import { Component, OnInit } from '@angular/core';

import { Survey } from '../shared/survey';
import { Question } from '../shared/question';

import {SurveyService} from '../shared/services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent {

  constructor(private surveyService: SurveyService) { }

  trackByFn(index: any, item: any) {
    return index;
  }
  questions: Question[] = [new Question(1, "", 1)];
  model = new Survey(new Date(), new Date(), "");

  addQuestion() {
    this.questions.push(new Question(1, "", 1));
  }

  deleteQuestion(question) {
    if (this.questions.length > 1) {
      let index = this.questions.indexOf(question);
      this.questions.splice(index, 1);
    }
  }

  submitted = false;

  onSubmit() {
    this.surveyService.createSurvey(this.model)
      .then(
        insertId => {
          this.questions.map(
            (question) => this.surveyService.addQuestions(insertId, question)
          );
        }
      );
    this.submitted = true;
  }


  get diagnostic() { return JSON.stringify(this.model); }

}
