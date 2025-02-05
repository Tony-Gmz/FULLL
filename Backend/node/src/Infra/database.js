const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../data/fleet.db'); 

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS fleet (
            fleet_id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle (
            plate_number TEXT PRIMARY KEY,
            brand TEXT,
            model TEXT,
            type TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle_fleet (
            id TEXT PRIMARY KEY,
            vehicle_plate_number TEXT REFERENCES vehicle(plate_number),
            fleet_id TEXT REFERENCES fleet(fleet_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle_location (
            id TEXT PRIMARY KEY,
            vehicle_plate_number TEXT REFERENCES vehicle(plate_number),
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            altitude REAL
        )
    `);
});

module.exports = db;
