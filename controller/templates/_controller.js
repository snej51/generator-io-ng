'use strict';

/**
 * @ngdoc function
 * @name <%= projectName %>.<%= camelControllerName %>Ctrl
 * @description
 * # <%= camelControllerName %>Ctrl
 * Controller of the <%= projectName %>
 */
angular.module('<%= projectName %>')
  .controller('<%= camelControllerName %>Ctrl', function ($scope) {
    $scope.test = [
      'Test123',
      'Test1234',
      'Test12345'
    ];
  });