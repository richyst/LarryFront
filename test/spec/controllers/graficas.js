'use strict';

describe('Controller: GraficasCtrl', function () {

  // load the controller's module
  beforeEach(module('larryFrontApp'));

  var GraficasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GraficasCtrl = $controller('GraficasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GraficasCtrl.awesomeThings.length).toBe(3);
  });
});
