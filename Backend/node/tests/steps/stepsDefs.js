const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const Fleet = require("../../src/Domain/entities/Fleet");
const Vehicle = require("../../src/Domain/entities/Vehicle");
const VehicleLocation = require("../../src/Domain/entities/VehicleLocation");

// ----------------------------------------------------------------------------- //
// Variables globales de test
let fleet;
let otherFleet;
let vehicle;
let error;
let location;
let vehicleLocationHistory = [];

// ----------------------------------------------------------------------------- //
// Common Steps

Given("my fleet", function () {
    fleet = new Fleet("FLEET123");
});

Given("a vehicle", function () {
    vehicle = new Vehicle("ABC123");
});

Given("I have registered this vehicle into my fleet", function () {
    fleet.addVehicle(vehicle.plateNumber);
});

Given("a location", function () {
    location = { latitude: 48.8566, longitude: 2.3522, altitude: 35 }; // Exemple : coordonnées de Paris
});

// ----------------------------------------------------------------------------- //
// Scénario 1: I can register a vehicle

When("I register this vehicle into my fleet", function () {
    try {
        fleet.addVehicle(vehicle.plateNumber);
    } catch (e) {
        error = e;
    }
});

Then("this vehicle should be successfully registered into my vehicle fleet", function () {
    assert.strictEqual(fleet.hasVehicle(vehicle.plateNumber), true);
});

// ----------------------------------------------------------------------------- //
// Scénario 2: I can't register same vehicle twice

When("I try to register this vehicle into my fleet again", function () {
    try {
        fleet.addVehicle(vehicle.plateNumber);
    } catch (e) {
        error = e;
    }
});

Then("I should be informed that this vehicle is already in my fleet", function () {
    assert.strictEqual(error.message, `Vehicle ${vehicle.plateNumber} already exists in the fleet`);
});

// ----------------------------------------------------------------------------- //
// Scénario 3: Same vehicle can belong to more than one fleet

Given("the fleet of another user exists", function () {
    otherFleet = new Fleet("FLEET456");
});

Given("this vehicle has already been registered in the other user's fleet", function () {
    otherFleet.addVehicle(vehicle.plateNumber);
});

When("I register this vehicle into my fleet as well", function () {
    try {
        fleet.addVehicle(vehicle.plateNumber);
    } catch (e) {
        error = e;
    }
});

Then("this vehicle should also be part of my fleet", function () {
    assert.strictEqual(fleet.hasVehicle(vehicle.plateNumber), true);
    assert.strictEqual(otherFleet.hasVehicle(vehicle.plateNumber), true);
});

// ----------------------------------------------------------------------------- //
// Scénario 4: Successfully park a vehicle

When("I park my vehicle at this location", function () {
    const vehicleLocation = new VehicleLocation("LOCATION1", vehicle.plateNumber, location.latitude, location.longitude, location.altitude);
    vehicleLocationHistory.push(vehicleLocation);
});

Then("the known location of my vehicle should verify this location", function () {
    const latestLocation = vehicleLocationHistory.find(loc => loc.vehiclePlateNumber === vehicle.plateNumber);
    assert.strictEqual(latestLocation.latitude, location.latitude);
    assert.strictEqual(latestLocation.longitude, location.longitude);
    assert.strictEqual(latestLocation.altitude, location.altitude);
});

// ----------------------------------------------------------------------------- //
// Scénario 5: Can't localize my vehicle to the same location two times in a row

Given("my vehicle has been parked into this location", function () {
    const vehicleLocation = new VehicleLocation("LOCATION1", vehicle.plateNumber, location.latitude, location.longitude, location.altitude);
    vehicleLocationHistory.push(vehicleLocation);
});

When("I try to park my vehicle at this location", function () {
    const latestLocation = vehicleLocationHistory.find(loc => loc.vehiclePlateNumber === vehicle.plateNumber);
    if (
        latestLocation &&
        latestLocation.latitude === location.latitude &&
        latestLocation.longitude === location.longitude &&
        latestLocation.altitude === location.altitude
    ) {
        error = new Error("Vehicle is already parked at this location");
    }
});

Then("I should be informed that my vehicle is already parked at this location", function () {
    assert.strictEqual(error.message, "Vehicle is already parked at this location");
});
