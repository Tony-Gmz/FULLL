class FleetQueries {
    /**
     * @param {FleetRepository} fleetRepository - The repository for fleet data access.
     */
    constructor(fleetRepository) {
        this.fleetRepository = fleetRepository;
    }

    /**
     * Checks if a fleet exists by its ID.
     * @param {string} fleetId - The unique identifier of the fleet.
     * @returns {Promise<?object>} fleet or nothing.
     */
    async fleetExists(fleetId) {
        try {
            const fleet = await this.fleetRepository.findById(fleetId);
            return fleet ? fleet : null;
        } catch (error) {
            console.error(`Error checking if fleet exists: ${error.message}`);
            throw new Error('Error checking fleet existence');
        }
    }

    /**
     * Checks if a fleet has a vehicle.
     * @param {string} fleetId - The unique identifier of the fleet.
     * @param {string} vehicleId - The unique identifier of the vehicle.
     * @returns {Promise<?object>} True if the vehicle is registered in the fleet, otherwise false.
     */
    async fleetHasVehicle(fleetId, vehicleId) {
        try {
            const vehicle = await this.fleetRepository.hasVehicle(fleetId, vehicleId);
            return vehicle ? true : false;
        } catch (error) {
            console.error(`Error checking if fleet has vehicle: ${error.message}`);
            throw new Error('Error checking fleet vehicle existence');
        }
    }
}

module.exports = FleetQueries;
