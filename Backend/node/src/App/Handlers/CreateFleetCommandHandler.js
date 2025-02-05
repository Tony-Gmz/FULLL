const Fleet = require('../../Domain/entities/Fleet');

class CreateFleetCommandHandler {
    constructor(fleetRepository) {
        this.fleetRepository = fleetRepository;
    }

    handle(command) {
        const fleetId = `fleet-${Date.now()}`;
        const fleet = new Fleet(fleetId, command.userId);
        console.log(fleet);
        this.fleetRepository.create(fleet);
        return fleetId;
    }
}

module.exports = { CreateFleetCommandHandler };
