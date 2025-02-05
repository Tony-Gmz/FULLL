class Fleet {
    constructor(id) {
        this.id = id;
        this.vehicles = new Set();
    }

    addVehicle(vehiclePlateNumber) {
        if (this.vehicles.has(vehiclePlateNumber)) {
            throw new Error(`Vehicle ${vehiclePlateNumber} already exists in the fleet`);
        }
        this.vehicles.add(vehiclePlateNumber);
    }

    hasVehicle(vehiclePlateNumber) {
        return this.vehicles.has(vehiclePlateNumber);
    }
}

module.exports = Fleet;
