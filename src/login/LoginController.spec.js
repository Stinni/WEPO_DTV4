// Student: Kristinn Heiðar Freysteinsson
// Login: kristinnf13
// Kt: 011081-3209

describe("LoginController", function() {

/*
 * What happens when the user enters a valid username/password combination
 * (example: smu/smu) (Expected outcome: the browser navigates to the /about url)
 *
 * What happens when the user enters an invalid username/password combination (example: smu/barf)
 * (Expected outcome: the browser stays on the same url, and an error message is displayed).
*/

	var theController, scope;
	var mockResourceTrue = {
		isValidUserAndPass: function(user, pass) {
			return true;
		}
	};
	var mockResourceFalse = {
		isValidUserAndPass: function(user,pass) {
			return false;
		}
	};
	var mockLocation = {
		path: function(p) {
		}
	};

	beforeEach(module("testApp"));

	describe("when login resource returns true", function() {
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockLocation, "path");
			theController = $controller("LoginController", {
				$scope: scope,
				LoginResource: mockResourceTrue,
				$location: mockLocation
			});
		}));

		it("should have the onLogin function", function() {
			expect(scope.onLogin).toBeDefined();
		});

		it("should change the path to /about", function() {
			scope.onLogin();
			expect(mockLocation.path).toHaveBeenCalledWith("/about");
		});

		it("should NOT have set the errorMessage", function() {
			scope.onLogin();
			expect(scope.errorMessage).not.toEqual("Login failed!");
		});
	});

	describe("when login resource returns false", function() {
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockLocation, "path");
			theController = $controller("LoginController", {
				$scope: scope,
				LoginResource: mockResourceFalse,
				$location: mockLocation
			});
		}));

		it("should have set the errorMessage", function() {
			scope.onLogin();
			expect(scope.errorMessage).toEqual("Login failed!");
		});

		it("should NOT change the path to /about", function() {
			scope.onLogin();
			expect(mockLocation.path).not.toHaveBeenCalledWith("/about");
		});
	});
});