import { Router101Page } from './app.po';

describe('router101 App', () => {
  let page: Router101Page;

  beforeEach(() => {
    page = new Router101Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
