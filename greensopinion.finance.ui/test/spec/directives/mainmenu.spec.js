'use strict';

describe('Directive: mainmenu', function () {

  // load the directive's module
  beforeEach(module('greensopinionfinanceApp'));

  var $rootScope, $location, initializationService, element,
    scope;

  beforeEach(inject(function (_$rootScope_,_$location_,_initializationService_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    initializationService = _initializationService_;
    initializationService.initialized(true);
    scope = $rootScope.$new();
  }));

  it('should expose getClass',inject(function ($compile) {
    element = angular.element('<mainmenu></mainmenu>');
    element = $compile(element)(scope);
    $rootScope.$digest();

    expect(scope.getClass).toBeDefined();
    expect(scope.getClass('/not-here')).toBe('');

    $location.path('/');
    expect(scope.getClass('/')).toBe('active');
    expect(scope.getClass('/about')).toBe('');

    $location.path('/about');
    expect(scope.getClass('/')).toBe('');
    expect(scope.getClass('/about')).toBe('active');
  }));

  it('should expose isVisible()',inject(function($compile) {
    element = angular.element('<mainmenu></mainmenu>');
    element = $compile(element)(scope);
    $rootScope.$digest();

    initializationService.initialized(false);

    expect(scope.isVisible({ })).toBe(false);
    expect(scope.isVisible({ insecure: false })).toBe(false);
    expect(scope.isVisible({ insecure: true })).toBe(true);
    expect(scope.isVisible({ insecure: true, path: '/' })).toBe(true);

    initializationService.initialized(true);

    expect(scope.isVisible({ })).toBe(true);
    expect(scope.isVisible({ insecure: false })).toBe(true);
    expect(scope.isVisible({ insecure: true })).toBe(true);
    expect(scope.isVisible({ insecure: true })).toBe(true);
    expect(scope.isVisible({ insecure: true, path: '/' })).toBe(false);
  }));

  it('should have menu elements', inject(function ($compile) {
    element = angular.element('<mainmenu></mainmenu>');
    element = $compile(element)(scope);
    $rootScope.$digest();

    var homeNav = element.find('a:contains("Import")');
    expect(homeNav.attr('href')).toBe('#/import');

    var aboutNav = element.find('a:contains("About")');
    expect(aboutNav.attr('href')).toBe('#/about');
  }));

});
