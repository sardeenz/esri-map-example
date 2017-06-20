import { EsriMapExamplePage } from './app.po';

describe('esri-map-example App', () => {
  let page: EsriMapExamplePage;

  beforeEach(() => {
    page = new EsriMapExamplePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
