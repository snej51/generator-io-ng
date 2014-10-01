'use strict';

/**
 * @ngdoc directive
 * @name <%= camelDirectiveName %>
 * @description
 * # <%= camelDirectiveName %>
 */
angular.module('<%= projectName %>.<%= camelDirectiveName %>')
  .directive('<%= camelDirectiveName %>', function () {
    return {
      template: '<%= directivePath %><%= camelDirectiveName %>.tpl.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= camelDirectiveName %> directive');
      }
    };
  });
