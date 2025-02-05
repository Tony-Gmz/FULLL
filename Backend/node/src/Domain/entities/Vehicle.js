const yup = require('yup');

class Vehicle {
    /**
     * Creates a new Vehicle instance.
     * @param {string} plateNumber - The unique plate number of the vehicle.
     * @param {string} brand (optional) - The brand of the vehicle.
     * @param {string} model (optional) - The model of the vehicle.
     * @param {string} [type='Unknown'] (optional) - The type of the vehicle.
     * @throws {Error} If validation fails.
     */
    constructor(plateNumber, brand = 'Unknown brand', model = 'Unknown model', type = 'Unknown type') {
        // Définition du schéma de validation
        const schema = yup.object().shape({
            plateNumber: yup.string().required('The "plateNumber" param is required'),
            brand: yup.string().required('The "brand" param is required'),
            model: yup.string().required('The "model" param is required'),
            type: yup.string().default('Unknown')
        });

        // Validation et parsing des données
        const validatedData = schema.validateSync({ plateNumber, brand, model, type });

        // Assignation des valeurs validées
        this.plateNumber = validatedData.plateNumber;
        this.brand = validatedData.brand;
        this.model = validatedData.model;
        this.type = validatedData.type;
    }
}

module.exports = Vehicle;
