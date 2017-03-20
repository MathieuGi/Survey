import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PrefaceComponent } from './preface/preface.component';
import { QuestionComponent } from './question/question.component';
import { SurveyComponent } from './survey/survey.component';
import { WrongLinkComponent } from './wrong-link/wrong-link.component';
import { SurveyPostedComponent } from './survey-posted/survey-posted.component';

import { SurveyService } from './services/survey/survey.service';
import { QuestionService } from './services/question/question.service';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrefaceComponent,
    QuestionComponent,
    SurveyComponent,
    WrongLinkComponent,
    SurveyPostedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'survey/:token',
        component: SurveyComponent
      },
      {
        path: 'survey-posted',
        component: SurveyPostedComponent
      },
      {
        path: '404',
        component: WrongLinkComponent
      },
      {
        path: "**",
        redirectTo: '/404',
        pathMatch: "full"
      }
    ])
  ],
  providers: [SurveyService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
