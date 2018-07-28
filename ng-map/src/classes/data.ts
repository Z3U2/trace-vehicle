export class _VehicleData {



    constructor(_id = '',
                vehicleId='',
                lat = 0,
                lng = 0,
                fuel = 0,
                velocity = 0,
                time = 0,
                load = 0
            ) {
        this._id = _id;
        this.vehicleId = vehicleId;
        this.lat = lat;
        this.lng = lng;
        this.fuel = fuel;
        this.velocity = velocity;
        this.time = time;
        this.load = load;
    }

    _id: string;
    vehicleId: string;
    lat: number;
    lng: number;
    fuel: number;
    velocity: number;
    time: number;
    load: number;

}