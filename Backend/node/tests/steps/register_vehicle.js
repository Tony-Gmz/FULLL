const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

// ----------------------------------------------------------------------------- //

// Scénario 1: I can register a vehicle
Given("my fleet", function () {
    return 'pending';
});
Given("a vehicle", function () {
    return 'pending';
});
When("I register this vehicle into my fleet", function () {
    return 'pending';
});
Then("this vehicle should be successfully registered into my vehicle fleet", function () {
    return 'pending';
});

// ----------------------------------------------------------------------------- //

// Scénario 2: I can't register same vehicle twice
Given("my fleet", function () {
    return 'pending';
});
Given("a vehicle", function () {
    return 'pending';
});
Given("I have registered this vehicle into my fleet", function () {
    return 'pending';
});
When("I try to register this vehicle into my fleet again", function () {
    return 'pending';
});
Then("I should be informed that this vehicle is already in my fleet", function () {
    return 'pending';
});

// ----------------------------------------------------------------------------- //

// Scénario 3: Same vehicle can belong to more than one fleet
Given("my fleet", function () {
    return 'pending';
});
Given("the fleet of another user exists", function () {
    return 'pending';
});
Given("a vehicle", function () {
    return 'pending';
});
Given("this vehicle has already been registered in the other user's fleet", function () {
    return 'pending';
});
When("I register this vehicle into my fleet as well", function () {
    return 'pending';
});
Then("this vehicle should also be part of my fleet", function () {
    return 'pending';
});