import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Question } from '../shared/question';
import { QuestionService } from '../services/question/question.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  questionId: number;

  @Output()
  selectedAnswer = new EventEmitter<Question>();

  private question: Question;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.questionService
      .getQuestionById(this.questionId).then(question => {

        this.question = question;
        this.onSelectionChange("abstain");
      });
  }

  onSelectionChange(answer: string) {
    this.question.answer = answer;
    this.selectedAnswer.emit(this.question);
  }

}
