class VehicleQueries {
    /**
     * @param {VehicleRepository} vehicleRepository - The repository for vehicle data access.
     */
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    /**
     * Checks if a vehicle exists by its plate number.
     * @param {string} plateNumber - The unique plate number of the vehicle.
     * @returns {Promise<?object>} True if the vehicle exists, otherwise false.
     */
    async vehicleExists(plateNumber) {
        try {
            const vehicle = await this.vehicleRepository.findByPlateNumber(plateNumber);
            return vehicle ? vehicle : null;
        } catch (error) {
            console.error(`Error checking if vehicle exists: ${error.message}`);
            throw new Error('Error checking vehicle existence');        }
    }
}

module.exports = VehicleQueries;
