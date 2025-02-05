require('reflect-metadata');
const { IsString, IsArray, validateSync } = require('class-validator');

class Fleet {
    /**
     * Creates a new Fleet instance.
     * @param {string} id - The unique identifier of the fleet.
     * @param {string} userId - The unique identifier of the user who owns the fleet.
     * @param {[]} [vehicles=[]] - An array of vehicle plate numbers associated with the fleet.
     * @throws {Error} If validation fails.
     */
    constructor(id, userId, vehicles = []) {
        this.id = id;
        this.userId = userId;
        this.vehicles = new Set(vehicles);

        // Validate the object properties
        const errors = validateSync(this);
        if (errors.length > 0) {
            throw new Error(`Validation error: ${errors.map(err => Object.values(err.constraints).join(', ')).join('; ')}`);
        }
    }

    /**
     * Adds a vehicle to the fleet.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle to be added.
     * @throws {Error} If the vehicle is already present in the fleet.
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
     * @returns {boolean} True if the vehicle is present, otherwise false.
     */
    hasVehicle(vehiclePlateNumber) {
        return this.vehicles.has(vehiclePlateNumber);
    }
}

module.exports = Fleet;
