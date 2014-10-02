describe('<%= camelFactoryName %> section', function () {
  beforeEach(module('<%= projectName %>.<%= camelFactoryName %>'));

  it('should have a dummy test', inject(function () {
    expect(true).toBeTruthy();
  }));
});
