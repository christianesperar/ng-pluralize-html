# ng-pluralize-html [![Build Status](https://travis-ci.org/christianesperar/ng-pluralize-html.svg?branch=master)](https://travis-ci.org/christianesperar/ng-pluralize-html)
Module that extends ng-pluralize directive to support HTML

It has exactly the same API functionality, just change **ng-pluralize** to **ng-pluralize-html**

API documentation can be found [here](https://docs.angularjs.org/api/ng/directive/ngPluralize)

## Usage
### Install
    bower install ng-pluralize-html --save
### Example
Click [here](https://rawgit.com/christianesperar/ng-pluralize-html/master/example/github.html) to see it in action

#### JS
```javascript
// Declare the dependency module
var sampleApp = angular.module('ngPluralizeHtmlSample', ['ngPluralizeHtml']);

// Use it like ng-pluralize
sampleApp.controller('NgPluralizeHtmlController', ['$scope', function NgPluralizeHtmlController($scope){
  $scope.person1 = 'Igor';
  $scope.person2 = 'Misko';
  $scope.personCount = 1;
}]);
```

#### HTML
```html
<div ng-app="ngPluralizeHtmlSample">
  <h1>Using ng-pluralize-html</h1>
  <div ng-controller="NgPluralizeHtmlController">
    <label>Person 1:<input type="text" ng-model="person1" value="Igor"/></label><br/>
    <label>Person 2:<input type="text" ng-model="person2" value="Misko"/></label><br/>
    <label>Number of People:<input type="text" ng-model="personCount" value="1"/></label><br/>

    <!-- Example with simple pluralization rules for en locale -->
    Without Offset:
    <ng-pluralize-html
      count="personCount"
      when="{
        '0': '<strong>Nobody</strong> is viewing.',
        'one': '<strong>1</strong> person is viewing.',
        'other': '<strong>{}</strong> people are viewing.'
      }">
    </ng-pluralize-html>

    <br>

    <!-- Example with offset -->
    With Offset(2):
    <ng-pluralize-html
      count="personCount"
      offset="2"
      when="{'0': '<strong>Nobody</strong> is viewing.',
        '1': '<strong>{{person1}}</strong> is viewing.',
        '2': '<strong>{{person1}} and {{person2}}</strong> are viewing.',
        'one': '<strong>{{person1}}, {{person2}} and one</strong> other person are viewing.',
        'other': '<strong>{{person1}}, {{person2}} and {}</strong> other people are viewing.'
      }">
    </ng-pluralize-html>
  </div>
</div>
```
