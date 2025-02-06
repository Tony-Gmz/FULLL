/**
 * Command & Handler require.
 */
const CreateFleetCommand = require('../App/Commands/Fleet/CreateFleetCommand');
const { CreateFleetCommandHandler } = require('../App/Handlers/Fleet/CreateFleetCommandHandler');

const CreateVehicleCommand = require('../App/Commands/Vehicle/CreateVehicleCommand');
const { CreateVehicleCommandHandler } = require('../App/Handlers/Vehicle/CreateVehicleCommandHandler');

const RegisterVehicleCommand = require('../App/Commands/Vehicle/RegisterVehicleCommand');
const { RegisterVehicleCommandHandler } = require('../App/Handlers/Vehicle/RegisterVehicleCommandHandler');

/**
 * Repository require.
 */
const FleetRepository = require('../Infra/repositories/FleetRepository');
const VehicleRepository = require('../Infra/repositories/VehicleRepository');

/**
 * Queries require.
 */
const VehicleQueries = require('../App/Queries/Vehicle/VehicleQueries');
const FleetQueries = require('../App/Queries/Fleet/FleetQueries');

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'create-fleet':
        handleCreateFleet(args);
        break;
    case 'create-vehicle':
        handleCreateVehicle(args);
        break;
    case 'register-vehicle':
        handleRegisterVehicle(args);
        break;
    case '--help':
    case '-h':
        console.log('./fleet create-fleet <userId>');
        console.log('./fleet create-vehicle <vehiclePlateNumber> [brand] [model] [type]');
        console.log('./fleet register-vehicle <fleetId> <vehiclePlateNumber>');
        process.exit(1);
    default:
        console.error('Invalid command. Use --help to see available commands.');
        process.exit(1);
}

/**
 * Handles the creation of a fleet based on command-line input.
 * @param {string[]} args - The array of arguments passed to the script.
 */
async function handleCreateFleet(args) {
    const userId = args[1];

    if (!userId) {
        console.error('Error: Missing userId.');
        process.exit(1);
    }

    const createCommand = new CreateFleetCommand(userId);
    const handler = new CreateFleetCommandHandler(new FleetRepository());

    try {
        const fleetId = await handler.handle(createCommand);
        console.log(`Fleet created with ID: ${fleetId}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

/**
 * Handles the creation of a vehicle based on command-line input.
 * @param {string[]} args - The array of arguments passed to the script.
 */
async function handleCreateVehicle(args) {
    const plateNumber = args[1];
    const brand = args[2];
    const model = args[3];
    const type  = args[4];

    if (!plateNumber ) {
        console.error('Error: Missing required parameter plateNumber)');
        process.exit(1);
    }

    const vehicleRepository = new VehicleRepository();
    const vehicleQueries = new VehicleQueries(vehicleRepository);
    const createCommand = new CreateVehicleCommand(plateNumber, brand, model, type);
    const handler = new CreateVehicleCommandHandler(vehicleRepository, vehicleQueries);

    try {
        await handler.handle(createCommand);
        console.log(`Vehicle with plate number ${plateNumber} created successfully`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

/**
 * Handles the registration of a vehicle in a fleet based on command-line input.
 * @param {string[]} args - The array of arguments passed to the script.
 */
async function handleRegisterVehicle(args) {
    const [fleetId, vehiclePlateNumber] = args.slice(1);

    if (!fleetId || !vehiclePlateNumber) {
        console.error('Error: Missing required parameters (fleetId, vehiclePlateNumber)');
        process.exit(1);
    }

    // Initialize repositories, queries, and handler
    const fleetRepository = new FleetRepository();
    const vehicleRepository = new VehicleRepository();
    const fleetQueries = new FleetQueries(fleetRepository);
    const vehicleQueries = new VehicleQueries(vehicleRepository);
    const registerCommand = new RegisterVehicleCommand(fleetId, vehiclePlateNumber);
    const handler = new RegisterVehicleCommandHandler(fleetRepository, vehicleRepository, fleetQueries, vehicleQueries);


    try {
        await handler.handle(registerCommand);
        console.log(`Vehicle with plate number ${vehiclePlateNumber} successfully registered to fleet ${fleetId}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}