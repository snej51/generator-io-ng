describe('<%= camelControllerName %> section', function () {
  beforeEach(module('<%= projectName %>.<%= camelControllerName %>'));

  it('should have a dummy test', inject(function () {
    expect(true).toBeTruthy();
  }));
});
