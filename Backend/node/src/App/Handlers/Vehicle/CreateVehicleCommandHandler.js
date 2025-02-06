const Vehicle = require('../../../Domain/entities/Vehicle');

class CreateVehicleCommandHandler {
    /**
     * @param {VehicleRepository} vehicleRepository - The repository to handle vehicle persistence.
     * @param {VehicleQueries} vehicleQueries - The query service to check for existing vehicles.
     */
    constructor(vehicleRepository, vehicleQueries) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleQueries = vehicleQueries;
    }

    /**
     * Handles the creation of a vehicle.
     * @param {CreateVehicleCommand} command - The command containing vehicle data.
     * @throws {Error} If the vehicle already exists.
     * @returns {Promise<void>}
     */
    async handle(command) {
        const exists = await this.vehicleQueries.vehicleExists(command.plateNumber);
        if (exists) {
            throw new Error(`Vehicle with plate number ${command.plateNumber} already exists`);
        }
        const id = `vehicle-${Date.now()}`;
        const vehicle = new Vehicle(id, command.plateNumber, command.brand, command.model, command.type);
        console.log(vehicle, "je suis le vehicle");
        this.vehicleRepository.create(vehicle);
        return;
    }
}

module.exports = {CreateVehicleCommandHandler};
