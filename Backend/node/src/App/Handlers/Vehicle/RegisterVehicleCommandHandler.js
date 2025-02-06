const { date } = require("yup");

class RegisterVehicleCommandHandler {
    /**
     * @param {FleetRepository} fleetRepository - The repository to manage fleets.
     * @param {VehicleRepository} vehicleRepository - The repository to manage vehicles.
     * @param {FleetQueries} fleetQueries - Queries to validate the fleet's existence.
     * @param {VehicleQueries} vehicleQueries - Queries to validate the vehicle's existence.
     */
    constructor(fleetRepository, vehicleRepository, fleetQueries, vehicleQueries) {
        this.fleetRepository = fleetRepository;
        this.vehicleRepository = vehicleRepository;
        this.fleetQueries = fleetQueries;
        this.vehicleQueries = vehicleQueries;
    }

    /**
     * Handles the registration of a vehicle in a fleet.
     * @param {RegisterVehicleCommand} command - The command to register a vehicle.
     * @throws {Error} If the fleet or vehicle doesn't exist, or if the vehicle is already registered.
     */
    async handle(command) {

        const fleet = await this.fleetQueries.fleetExists(command.fleetId);
        if (!fleet) {
            throw new Error(`Fleet with ID ${command.fleetId} does not exist`);
        }

        const vehicle = await this.vehicleQueries.vehicleExists(command.vehiclePlateNumber);
        if (!vehicle) {
            throw new Error(`Vehicle with plate number ${command.vehiclePlateNumber} does not exist`);
        }

        const fleetHasVehicle = await this.fleetQueries.fleetHasVehicle(fleet.id, vehicle.id);
        if (fleetHasVehicle) {
            throw new Error(`Vehicle ${command.vehiclePlateNumber} is already registered in the fleet`);
        }

        const id = `vehicle_fleet_${Date.now()}`;
        this.fleetRepository.addVehicle(id, fleet.id, vehicle.id);
    }
}

module.exports = {RegisterVehicleCommandHandler};
