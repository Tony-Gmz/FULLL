const yup = require('yup');

class Vehicle {
    /**
     * Creates a new Vehicle instance.
     * @param {string} id - The unique identifier of the vehicle.
     * @param {string} plateNumber - The unique plate number of the vehicle.
     * @param {string} [brand='Unknown'] (optional) - The brand of the vehicle.
     * @param {string} [model='Unknown'] (optional) - The model of the vehicle.
     * @param {string} [type='Unknown'] (optional) - The type of the vehicle.
     * @throws {Error} If validation fails.
     */
    constructor(id, plateNumber, brand, model, type) {
        
        const schema = yup.object().shape({
            id: yup.string().required('The "id" param is required'),
            plateNumber: yup.string().required('The "plateNumber" param is required'),
            brand: yup.string().default('Unknown'),
            model: yup.string().default('Unknown'),
            type: yup.string().default('Unknown')
        });

        const validatedData = schema.validateSync({ id, plateNumber, brand, model, type });

        this.id = validatedData.id;
        this.plateNumber = validatedData.plateNumber;
        this.brand = validatedData.brand;
        this.model = validatedData.model;
        this.type = validatedData.type;
    }
}

module.exports = Vehicle;
