'use strict';

var sampleApp = angular.module('ngPluralizeHtmlSample', ['ngPluralizeHtml']);

sampleApp.controller('NgPluralizeHtmlController', ['$scope', function NgPluralizeHtmlController($scope){
  $scope.person1 = 'Igor';
  $scope.person2 = 'Misko';
  $scope.personCount = 1;
}]);
