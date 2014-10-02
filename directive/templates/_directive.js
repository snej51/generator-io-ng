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
      template: '<%= directivePath %>.tpl.html',
      restrict: 'E',
      <%if( withController ) { %>
      controller: '<%= camelDirectiveName %>Ctrl'<% } %>
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= camelDirectiveName %> directive');
      }
    };
  });
