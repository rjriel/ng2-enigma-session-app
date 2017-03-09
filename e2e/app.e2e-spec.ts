import { UploadTestPage } from './app.po';

describe('upload-test App', () => {
  let page: UploadTestPage;

  beforeEach(() => {
    page = new UploadTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
