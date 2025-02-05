const db = require('../database');

class FleetRepository {
    create(fleet) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO fleet (fleet_id, user_id) VALUES (?, ?)`;
            db.run(query, [fleet.id, fleet.userId], function (err) {
                if (err) return reject(err);
                resolve(fleet);
            });
        });
    }

    findById(fleetId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM fleet WHERE fleet_id = ?`;
            db.get(query, [fleetId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = FleetRepository;
