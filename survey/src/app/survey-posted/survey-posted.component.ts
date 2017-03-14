import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../services/question/question.service';
import { Question } from '../shared/question';

@Component({
  selector: 'app-survey-posted',
  templateUrl: './survey-posted.component.html',
  styleUrls: ['./survey-posted.component.css']
})
export class SurveyPostedComponent implements OnInit {

  private questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestionsId(1).then(questionsId => {
      console.log(questionsId);
      for (let i = 0; i < questionsId.length; i++) {
        console.log(questionsId[i]);
        this.questionService.getQuestionInfosById(questionsId[i].id).then(question => this.questions.push(question));
      }
    });
  }

}
