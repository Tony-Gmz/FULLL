class RegisterVehicleCommand {
    /**
     * Command to register a vehicle in a fleet.
     * @param {string} fleetId - The unique identifier of the fleet.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle to register.
     */
    constructor(fleetId, vehiclePlateNumber) {
        if (!fleetId) throw new Error('fleetId is required');
        if (!vehiclePlateNumber) throw new Error('vehiclePlateNumber is required');

        this.fleetId = fleetId;
        this.vehiclePlateNumber = vehiclePlateNumber;
    }
}

module.exports = RegisterVehicleCommand;
