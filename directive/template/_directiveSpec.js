describe('<%= camelDirectiveName %> section', function () {
  beforeEach(module('<%= projectName %>.<%= camelDirectiveName %>'));

  it('should have a dummy test', inject(function() {
    expect(true).toBeTruthy();
  }));
});
