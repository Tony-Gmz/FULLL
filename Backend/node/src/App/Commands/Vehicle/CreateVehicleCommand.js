class CreateVehicleCommand {
    /**
     * Command to create a vehicle.
     * @param {string} plateNumber - The unique plate number of the vehicle.
     * @param {string} [brand] (optional) - The brand of the vehicle.
     * @param {string} [model] (optional) - The model of the vehicle.
     * @param {string} [type]  (optional) - The type of the vehicle.
     */
    constructor(plateNumber, brand, model, type) {
        if (!plateNumber) throw new Error('plateNumber is required');

        this.plateNumber = plateNumber;
        this.brand = brand;
        this.model = model;
        this.type = type;
    }
}

module.exports = CreateVehicleCommand;
