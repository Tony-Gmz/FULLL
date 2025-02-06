const db = require('../database');

class VehicleRepository {
    create(vehicle) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO vehicle (id, plate_number, brand, model, type) VALUES (?, ?, ?, ?, ?)`;
            db.run(query, [vehicle.id, vehicle.plateNumber, vehicle.brand, vehicle.model, vehicle.type], function (err) {
                if (err) return reject(err);
                resolve(vehicle);
            });
        });
    }

    findByPlateNumber(plateNumber) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM vehicle WHERE plate_number = ?`;
            db.get(query, [plateNumber], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = VehicleRepository;
