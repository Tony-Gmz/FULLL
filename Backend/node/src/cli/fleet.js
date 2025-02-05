const CreateFleetCommand = require('../App/Commands/Fleet/CreateFleetCommand');
const CreateFleetCommandHandler = require('../App/Handlers/Fleet/CreateFleetCommandHandler');
const FleetRepository = require('../Infra/repositories/FleetRepository');

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'create':
        handleCreateFleet(args);
        break;
    default:
        console.error('Invalid command');
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
