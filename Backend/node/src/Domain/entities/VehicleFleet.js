const yup = require('yup');

class VehicleFleet {
    /**
     * Creates a new VehicleFleet association.
     * @param {string} id - The unique identifier of the vehicle-fleet association.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle.
     * @param {string} fleetId - The unique identifier of the fleet.
     * @throws {Error} If validation fails.
     */
    constructor(id, vehiclePlateNumber, fleetId) {
        // Définition du schéma de validation
        const schema = yup.object().shape({
            id: yup.string().required('The "id" param is required'),
            vehiclePlateNumber: yup.string().required('The "vehiclePlateNumber" param is required'),
            fleetId: yup.string().required('The "fleetId" param is required')
        });

        // Validation et parsing des données
        const validatedData = schema.validateSync({ id, vehiclePlateNumber, fleetId });

        // Assignation des valeurs validées
        this.id = validatedData.id;
        this.vehiclePlateNumber = validatedData.vehiclePlateNumber;
        this.fleetId = validatedData.fleetId;
    }
}

module.exports = VehicleFleet;
