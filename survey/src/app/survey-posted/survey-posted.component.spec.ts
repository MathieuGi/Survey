import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPostedComponent } from './survey-posted.component';

describe('SurveyPostedComponent', () => {
  let component: SurveyPostedComponent;
  let fixture: ComponentFixture<SurveyPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
