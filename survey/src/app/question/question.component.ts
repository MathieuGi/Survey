import { Component, OnInit, Input } from '@angular/core';
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

  private question: Question;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>
        this.questionService
          .getQuestionById(this.questionId))
      .subscribe(question => {
        console.log(question);
        this.question = question
      });
  }

}
