import { SurveyPage } from './app.po';

describe('survey App', () => {
  let page: SurveyPage;

  beforeEach(() => {
    page = new SurveyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
