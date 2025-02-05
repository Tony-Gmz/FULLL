const Fleet = require('../../Domain/entities/Fleet');

class CreateFleetCommandHandler {
    /**
     * Handles the creation of a fleet by interacting with the fleet repository.
     * @param {Object} fleetRepository - The repository used to manage fleet data storage.
     */
    constructor(fleetRepository) {
        this.fleetRepository = fleetRepository;
    }

    /**
     * Processes the CreateFleetCommand to create a new fleet.
     * @param {Object} command - The command containing the information needed to create the fleet.
     * @param {string} command.userId - The ID of the user who owns the fleet.
     * @returns {string} The ID of the newly created fleet.
     */
    handle(command) {
        const fleetId = `fleet-${Date.now()}`;
        const fleet = new Fleet(fleetId, command.userId);
        this.fleetRepository.create(fleet);
        return fleetId;
    }
}

module.exports = { CreateFleetCommandHandler };
