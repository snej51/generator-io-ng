'use strict';

/**
 * @ngdoc function
 * @name <%= projectName %>.<%= capitalDirectiveName %>Ctrl
 * @description
 * # <%= capitalDirectiveName %>Ctrl
 * Controller of the <%= capitalDirectiveName %> directive.
 */
angular.module('<%= projectName %>')
  .controller('<%= capitalDirectiveName %>Ctrl', function ($scope) {
    $scope.test = [
      'Test123',
      'Test1234',
      'Test12345'
    ];
  });