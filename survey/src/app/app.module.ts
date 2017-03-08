import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PrefaceComponent } from './preface/preface.component';
import { QuestionComponent } from './question/question.component';
import { SurveyComponent } from './survey/survey.component';

import { SurveyService } from './services/survey/survey.service';
import { QuestionService } from './services/question/question.service';

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrefaceComponent,
    QuestionComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'survey/:token',
        component: HeaderComponent
      }
    ])
  ],
  providers: [SurveyService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
