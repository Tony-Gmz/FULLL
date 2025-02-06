const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

const FleetRepository = require("../../src/Infra/repositories/FleetRepository");
const VehicleRepository = require("../../src/Infra/repositories/VehicleRepository");

const { RegisterVehicleCommandHandler } = require("../../src/App/Handlers/Vehicle/RegisterVehicleCommandHandler");
const { CreateFleetCommandHandler } = require("../../src/App/Handlers/Fleet/CreateFleetCommandHandler");
const { CreateVehicleCommandHandler } = require("../../src/App/Handlers/Vehicle/CreateVehicleCommandHandler");

const RegisterVehicleCommand = require("../../src/App/Commands/Vehicle/RegisterVehicleCommand");
const CreateFleetCommand = require("../../src/App/Commands/Fleet/CreateFleetCommand");
const CreateVehicleCommand = require("../../src/App/Commands/Vehicle/CreateVehicleCommand");

const VehicleQueries = require("../../src/App/Queries/Vehicle/VehicleQueries");
const FleetQueries = require("../../src/App/Queries/Fleet/FleetQueries");

// ----------------------------------------------------------------------------- //
// Global variables for the test environment
let fleetRepository;
let vehicleRepository;
let fleetQueries;
let vehicleQueries;

let fleet;
let otherFleet;
let vehicle;
let error;

let registerVehicleHandler;
let createFleetHandler;
let createVehicleHandler;

// ----------------------------------------------------------------------------- //
// Configuration for the test environment

Given("my fleet", async function () {
    fleetRepository = new FleetRepository();
    vehicleRepository = new VehicleRepository();

    fleetQueries = new FleetQueries(fleetRepository);
    vehicleQueries = new VehicleQueries(vehicleRepository);

    registerVehicleHandler = new RegisterVehicleCommandHandler(
        fleetRepository,
        vehicleRepository,
        fleetQueries,
        vehicleQueries
    );

    createFleetHandler = new CreateFleetCommandHandler(fleetRepository);
    createVehicleHandler = new CreateVehicleCommandHandler(vehicleRepository, vehicleQueries);

    const createFleetCommand = new CreateFleetCommand("USER1");
    const fleetId = await createFleetHandler.handle(createFleetCommand);

    fleet = await fleetRepository.findById(fleetId);
});

Given("a vehicle", async function () {
    // Create a vehicle if it doesn't exist
    vehicle = await vehicleRepository.findByPlateNumber("ABC123");
    if (!vehicle) {
        const createVehicleCommand = new CreateVehicleCommand("ABC123", "Toyota", "Corolla");
        await createVehicleHandler.handle(createVehicleCommand);

        vehicle = await vehicleRepository.findByPlateNumber("ABC123");
    }
});

Given("I have registered this vehicle into my fleet", async function () {
    const command = new RegisterVehicleCommand(fleet.id, vehicle.plate_number);
    await registerVehicleHandler.handle(command);
});

// ----------------------------------------------------------------------------- //
// Scénario 1: I can register a vehicle

When("I register this vehicle into my fleet", async function () {
    try {
        const command = new RegisterVehicleCommand(fleet.id, vehicle.plate_number);
        await registerVehicleHandler.handle(command);
    } catch (e) {
        error = e;
    }
});

Then("this vehicle should be successfully registered into my vehicle fleet", async function () {
    const fleetHasVehicle = await fleetQueries.fleetHasVehicle(fleet.id, vehicle.id);
    assert.strictEqual(fleetHasVehicle, true);
});

// ----------------------------------------------------------------------------- //
// Scénario 2: I can't register same vehicle twice

When("I try to register this vehicle into my fleet again", async function () {
    try {
        const command = new RegisterVehicleCommand(fleet.id, vehicle.plate_number);
        await registerVehicleHandler.handle(command);
    } catch (e) {
        error = e;
    }
});

Then("I should be informed that this vehicle is already in my fleet", function () {
    assert.strictEqual(error.message, `Vehicle ${vehicle.plate_number} is already registered in the fleet`);
});

// ----------------------------------------------------------------------------- //
// Scénario 3: Same vehicle can belong to more than one fleet

Given("the fleet of another user exists", async function () {
    const createFleetCommand = new CreateFleetCommand("USER2");
    const otherFleetId = await createFleetHandler.handle(createFleetCommand);

    otherFleet = await fleetRepository.findById(otherFleetId);
});

Given("this vehicle has already been registered in the other user's fleet", async function () {
    const command = new RegisterVehicleCommand(otherFleet.id, vehicle.plate_number);
    await registerVehicleHandler.handle(command);
});

When("I register this vehicle into my fleet as well", async function () {
    try {
        const command = new RegisterVehicleCommand(fleet.id, vehicle.plate_number);
        await registerVehicleHandler.handle(command);
    } catch (e) {
        error = e;
    }
});

Then("this vehicle should also be part of my fleet", async function () {
    const fleetHasVehicle = await fleetQueries.fleetHasVehicle(fleet.id, vehicle.id);
    const otherFleetHasVehicle = await fleetQueries.fleetHasVehicle(otherFleet.id, vehicle.id);

    assert.strictEqual(fleetHasVehicle, true);
    assert.strictEqual(otherFleetHasVehicle, true);
});
