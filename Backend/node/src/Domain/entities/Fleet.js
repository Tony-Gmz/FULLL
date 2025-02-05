const yup = require('yup');

class Fleet {
    /**
     * Creates a new Fleet instance.
     * @param {string} id - The unique identifier of the fleet.
     * @param {string} userId (optional) - The unique identifier of the user who owns the fleet.
     * @param {string[]} [vehicles=[]] (optional) - An array of vehicle plate numbers associated with the fleet.
     * @throws {Error} If validation fails.
     */
    constructor(id, userId = "Test123", vehicles = []) {
        // Définition du schéma Yup
        const schema = yup.object().shape({
            id: yup.string().required('The "id" param is required'),
            userId: yup.string().required('The "userId" param is required'),
            vehicles: yup.array().of(yup.string()).default([])
        });

        const validatedData = schema.validateSync({ id, userId, vehicles });

        this.id = validatedData.id;
        this.userId = validatedData.userId;
        this.vehicles = new Set(validatedData.vehicles);
    }

    /**
     * Adds a vehicle to the fleet.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle to add.
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
