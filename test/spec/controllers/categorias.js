'use strict';

describe('Controller: CategoriasCtrl', function () {

  // load the controller's module
  beforeEach(module('larryFrontApp'));

  var CategoriasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriasCtrl = $controller('CategoriasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CategoriasCtrl.awesomeThings.length).toBe(3);
  });
});
