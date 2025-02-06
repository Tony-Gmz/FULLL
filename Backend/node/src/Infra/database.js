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
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle (
            id TEXT PRIMARY KEY,
            plate_number TEXT UNIQUE NOT NULL,
            brand TEXT,
            model TEXT,
            type TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle_fleet (
            id TEXT PRIMARY KEY,
            vehicle_id TEXT REFERENCES vehicle(id),
            fleet_id TEXT REFERENCES fleet(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vehicle_location (
            id TEXT PRIMARY KEY,
            vehicle_id TEXT REFERENCES vehicle(id),
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            altitude REAL,
            timestamp TEXT NOT NULL
        )
    `);
});

module.exports = db;
