describe('<%= camelServiceName %> section', function () {
  beforeEach(module('<%= projectName %>.<%= camelServiceName %>'));

  it('should have a dummy test', inject(function () {
    expect(true).toBeTruthy();
  }));
});
