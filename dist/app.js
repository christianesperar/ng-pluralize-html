'use strict';

/**
 * Module that extends ng-pluralize directive to support HTML
 * It has exactly the same API functionality, just change ng-pluralize to ng-pluralize-html
 * API documentation can be found here: https://docs.angularjs.org/api/ng/directive/ngPluralize
 */
var ngPluralizeHtml = angular.module('ngPluralizeHtml', []);

ngPluralizeHtml.directive('ngPluralizeHtml', ['$timeout', function($timeout) {
  return {
    restrict: 'AE',
    template:'<span ng-bind-html="htmlPluralize | trustedHtml"></span><span style="display: none"><ng-pluralize ng-if="!offset" count="count" when="when"></ng-pluralize><ng-pluralize ng-if="offset" count="count" offset="offset" when="when"></ng-pluralize></span>',
    scope: {
      count: '=',
      offset: '=?',
      when: '='
    },
    // Watch all the scope then get the generated string of ng-pluralize then
    // parse it using ng-bind-html
    link: function($scope, $elem, $attrs) {
      // Get the raw text of ng-pluralize element
      function getHtmlPluralizeText() {
        $timeout(function() {
          $scope.htmlPluralize = $elem.find('ng-pluralize').text();
        }, 100);
      }

      // Assign all the parent scope to this scope
      angular.forEach($scope.$parent, function(value, key) {
        if (key.indexOf('$') === -1) {
          $scope.$parent.$watch(key, function(val) {
            $scope[key] = val;

            getHtmlPluralizeText();
          });
        }
      });

      $scope.$watch('count', function(val) {
        getHtmlPluralizeText();
      });

      $scope.$watch('offset', function(val) {
        getHtmlPluralizeText();
      });

      $scope.$watch('when', function(val) {
        getHtmlPluralizeText();
      });
    },
  };
}]);

// Helper to successfully parse text to html
ngPluralizeHtml.filter('trustedHtml', ['$sce', function($sce){
  return $sce.trustAsHtml;
}]);
