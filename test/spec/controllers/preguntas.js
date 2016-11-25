'use strict';

describe('Controller: PreguntasCtrl', function () {

  // load the controller's module
  beforeEach(module('larryFrontApp'));

  var PreguntasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreguntasCtrl = $controller('PreguntasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PreguntasCtrl.awesomeThings.length).toBe(3);
  });
});
