'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= projectName %>')
  .controller('<%= capitalModuleName %>Ctrl', function ($scope) {
    $scope.test = [
      'Test123',
      'Test1234',
      'Test12345'
    ];
  });