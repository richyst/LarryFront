'use strict';

describe('Controller: TutorialCtrl', function () {

  // load the controller's module
  beforeEach(module('larryFrontApp'));

  var TutorialCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TutorialCtrl = $controller('TutorialCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TutorialCtrl.awesomeThings.length).toBe(3);
  });
});
