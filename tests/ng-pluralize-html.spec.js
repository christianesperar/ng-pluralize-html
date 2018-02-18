'use strict';

describe('ng-pluralize-html', function() {
  var $compile;
  var $rootScope;
  var $element;
  var $sce;
  var $timeout;

  beforeEach(module('ngPluralizeHtml'));

  beforeEach(
    inject(function(_$compile_, _$rootScope_,  _$sce_, _$timeout_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $sce = _$sce_;
      $timeout = _$timeout_;
    })
  );

  function compileDirective (count, when, offset) {
    var attributes = 'count="' + count + '" when="' + when + '"';

    if (offset) attributes += ' offset="' + offset + '"';

    $rootScope.person1 = 'Igor';
    $rootScope.person2 = 'Misko';

    $element = $compile('<ng-pluralize-html ' + attributes + '></ng-pluralize-html>')($rootScope);

    $rootScope.$digest();
    $timeout.flush();
  }

  describe('with count/when attributes', function() {
    var when = '{\'0\': \'<strong>Nobody</strong> is viewing.\', \'one\': \'<strong>1</strong> person is viewing.\', \'other\': \'<strong>{}</strong> people are viewing.\'}';

    it('should be singular', function() {
      compileDirective(0, when);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Nobody</strong> is viewing.');

      compileDirective(1, when);
      expect($element.find('span').eq(0).html()).toEqual('<strong>1</strong> person is viewing.');
    });

    it('should be plural', function() {
      compileDirective(2, when);
      expect($element.find('span').eq(0).html()).toEqual('<strong>2</strong> people are viewing.');

      compileDirective(3, when);
      expect($element.find('span').eq(0).html()).toEqual('<strong>3</strong> people are viewing.');
    });
  });

  describe('with count/when/offset attributes', function() {
    var when = '{\'0\': \'<strong>Nobody</strong> is viewing.\',\'1\': \'<strong>{{person1}}</strong> is viewing.\',\'2\': \'<strong>{{person1}} and {{person2}}</strong> are viewing.\',\'one\': \'<strong>{{person1}}, {{person2}} and one</strong> other person are viewing.\',\'other\': \'<strong>{{person1}}, {{person2}} and {}</strong> other people are viewing.\'}'

    it('should be singular', function() {
      compileDirective(0, when, 2);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Nobody</strong> is viewing.');

      compileDirective(1, when, 2);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Igor</strong> is viewing.');
    });

    it('should be plural', function() {
      compileDirective(2, when, 2);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Igor and Misko</strong> are viewing.');

      compileDirective(3, when, 2);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Igor, Misko and 1</strong> other people are viewing.');

      compileDirective(4, when, 2);
      expect($element.find('span').eq(0).html()).toEqual('<strong>Igor, Misko and 2</strong> other people are viewing.');
    });
  });
});