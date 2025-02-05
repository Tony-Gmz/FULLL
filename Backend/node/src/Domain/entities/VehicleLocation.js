class VehicleLocation {
    constructor(id, vehiclePlateNumber, latitude, longitude, altitude) {
        this.id = id;                       
        this.vehiclePlateNumber = vehiclePlateNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}

module.exports = VehicleLocation;
