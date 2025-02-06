const db = require('../database');

class FleetRepository {
    create(fleet) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO fleet (id, user_id) VALUES (?, ?)`;
            db.run(query, [fleet.id, fleet.userId], function (err) {
                if (err) return reject(err);
                resolve(fleet);
            });
        });
    }

    findById(fleetId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM fleet WHERE id = ?`;
            db.get(query, [fleetId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    addVehicle(id, fleetId, vehicleId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO vehicle_fleet (id, fleet_id, vehicle_id) VALUES (?, ?, ?)`;
            db.run(query, [id, fleetId, vehicleId], function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    hasVehicle(fleetId, vehicleId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM vehicle_fleet WHERE fleet_id = ? AND vehicle_id = ?`;
            db.get(query, [fleetId, vehicleId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = FleetRepository;
