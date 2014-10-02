'use strict';

/**
 * @ngdoc service
 * @name <%= projectName %>.<%= camelFactoryName %>
 * @description
 * # <%= camelFactoryName %>
 * Factory in the <%= projectName %>.
 */
angular.module('<%= projectName %>')
  .factory('<%= camelFactoryName %>', function () {
    // factory logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });