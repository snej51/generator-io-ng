describe('<%= camelConstantName %> section', function () {
  beforeEach(module('<%= projectName %>.<%= camelConstantName %>'));

  it('should have a dummy test', inject(function () {
    expect(true).toBeTruthy();
  }));
});

