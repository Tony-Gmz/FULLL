const yup = require('yup');

class VehicleLocation {
    /**
     * Creates a new VehicleLocation instance.
     * @param {string} id - The unique identifier of the location entry.
     * @param {string} vehiclePlateNumber - The plate number of the vehicle.
     * @param {number} latitude - The latitude of the vehicle's location.
     * @param {number} longitude - The longitude of the vehicle's location.
     * @param {number} [altitude=0] - The altitude of the vehicle's location.
     * @param {string} [timestamp=new Date().toISOString()] - The timestamp.
     * @throws {Error} If validation fails.
     */
    constructor(id, vehiclePlateNumber, latitude, longitude, altitude = 0, timestamp = new Date().toISOString()) {
        // Définition du schéma de validation
        const schema = yup.object().shape({
            id: yup.string().required('The "id" param is required'),
            vehiclePlateNumber: yup.string().required('The "vehiclePlateNumber" param is required'),
            latitude: yup.number().required('The "latitude" param is required'),
            longitude: yup.number().required('The "longitude" param is required'),
            altitude: yup.number().default(0),
            timestamp: yup.string().default(new Date().toISOString())
        });

        // Validation et parsing des données
        const validatedData = schema.validateSync({ id, vehiclePlateNumber, latitude, longitude, altitude, timestamp });

        // Assignation des valeurs validées
        this.id = validatedData.id;
        this.vehiclePlateNumber = validatedData.vehiclePlateNumber;
        this.latitude = validatedData.latitude;
        this.longitude = validatedData.longitude;
        this.altitude = validatedData.altitude;
        this.timestamp = validatedData.timestamp;
    }
}

module.exports = VehicleLocation;
