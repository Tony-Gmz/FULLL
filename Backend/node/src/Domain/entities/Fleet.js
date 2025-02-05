class Fleet {
    /**
     * Represents a fleet owned by a user.
     * @param {string} id - The unique identifier of the fleet.
     * @param {string} userId - The unique identifier of the user who owns the fleet.
     */
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.vehicles = new Set();
    }

    /**
     * Adds a vehicle to the fleet.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle to be added.
     * @throws {Error} If the vehicle is already in the fleet.
     */
    addVehicle(vehiclePlateNumber) {
        if (this.vehicles.has(vehiclePlateNumber)) {
            throw new Error(`Vehicle ${vehiclePlateNumber} already exists in the fleet`);
        }
        this.vehicles.add(vehiclePlateNumber);
    }

    /**
     * Checks if a vehicle is present in the fleet.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle to check.
     * @returns {boolean} True if the vehicle is in the fleet, otherwise false.
     */
    hasVehicle(vehiclePlateNumber) {
        return this.vehicles.has(vehiclePlateNumber);
    }
}

module.exports = Fleet;
