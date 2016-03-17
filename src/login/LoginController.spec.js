// Student: Kristinn Heiðar Freysteinsson
// Login: kristinnf13
// Kt: 011081-3209

describe("LoginController end to end tests", function() {

/*
 * What happens when the user enters a valid username/password combination
 * (example: smu/smu) (Expected outcome: the browser navigates to the /about url)
 */
	var usr = "smu";

	beforeEach(function() {
		browser.get("http://localhost:8089/src/#/");
	});

	it("should log in and navigate to the /about url", function() {

		element(by.model("username")).sendKeys(usr);
		element(by.model("password")).sendKeys(usr);
		element(by.id("loginBtn")).click();

		expect(browser.getLocationAbsUrl()).toBe("/about");
	});

/*
 * What happens when the user enters an invalid username/password combination (example: smu/barf)
 * (Expected outcome: the browser stays on the same url, and an error message is displayed).
*/
	it("should log in and navigate to the /about url", function() {

		element(by.model("username")).sendKeys(usr);
		element(by.model("password")).sendKeys("barf");
		element(by.id("loginBtn")).click();

		expect(browser.getLocationAbsUrl()).not.toBe("/about");
		expect(element(by.binding("errorMessage")).getText()).toBe("Login failed!");
	});
});