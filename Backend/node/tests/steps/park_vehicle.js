const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

// ----------------------------------------------------------------------------- //

// Scénario 1: Successfully park a vehicle
Given("my fleet", function () {
    return 'pending';
});
Given("a vehicle", function () {
    return 'pending';
});
Given("I have registered this vehicle into my fleet", function () {
    return 'pending';
});
Given("a location", function () {
    return 'pending';
});
When("I park my vehicle at this location", function () {
    return 'pending';
});
Then("the known location of my vehicle should verify this location", function () {
    return 'pending';
});

// ----------------------------------------------------------------------------- //

// Scénario 2: Can't localize my vehicle to the same location two times in a row
Given("my fleet", function () {
    return 'pending';
});
Given("a vehicle", function () {
    return 'pending';
});
Given("I have registered this vehicle into my fleet", function () {
    return 'pending';
});
Given("a location", function () {
    return 'pending';
});
Given("my vehicle has been parked into this location", function () {
    return 'pending';
});
When("I try to park my vehicle at this location", function () {
    return 'pending';
});
Then("I should be informed that my vehicle is already parked at this location", function () {
    return 'pending';
});