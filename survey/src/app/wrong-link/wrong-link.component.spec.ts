import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongLinkComponent } from './wrong-link.component';

describe('WrongLinkComponent', () => {
  let component: WrongLinkComponent;
  let fixture: ComponentFixture<WrongLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
