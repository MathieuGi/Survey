import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {SurveyService} from './shared/services/survey.service';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    CreateSurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
