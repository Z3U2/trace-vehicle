import { _Position } from '../classes/position'
import { _VehicleData } from './data';

export class PositionMarkerManager {
    map : google.maps.Map;
    vehicleMap : Map<string,_VehicleData>;
    private positionMarkers: Map<string, google.maps.Marker>;
    constructor(map : google.maps.Map) {
        this.map = map;
        this.positionMarkers = new Map<string,google.maps.Marker>();
        this.vehicleMap = new Map<string,_VehicleData>();
    }

    // updates markers when called
    update(val : Map<string,_VehicleData>) : void {
        // if a vehicle is deleted from the database we remove the marker
        for (let key of Array.from(this.positionMarkers.keys())) {
            if (val === null || !val.has(key)  ) {

                const marker = this.positionMarkers.get(key);
                marker.setMap(null);
                this.positionMarkers.delete(key);
            }
        }

        for (let key of Array.from(this.vehicleMap.keys())) {
            if (val === null || !val.has(key)) {
                this.vehicleMap.delete(key);
            }
        }

        for (let key of Array.from(val.keys())) {
            const position = val.get(key);

            if (this.vehicleMap.has(key)) {
                let info = this.vehicleMap.get(key)
                info._id = position._id;
                info.vehicleId = position.vehicleId;
                info.lat = position.lat;
                info.lng = position.lng;
                info.fuel = position.fuel;
                info.velocity = position.velocity;
                info.time = position.time;
                info.load = position.load;
            }
            else {
                this.vehicleMap.set(key,position)
            }
            // if marker exists we update position
            if (this.positionMarkers.has(key)) {
                const marker = this.positionMarkers.get(key);
                marker.setPosition({
                    lat: position.lat,
                    lng: position.lng
                });
                // if marker doesn't exist (new vehicle) we create the marker
            } else {
                const url = 'assets/images/icons8-truck-50.png';
                const marker = new google.maps.Marker({
                    position: {
                        lat: position.lat,
                        lng: position.lng
                    },
                    map: this.map,
                    icon: {
                        url,
                        anchor: new google.maps.Point(25, 25)
                    },
                    title: 'Vehicle ' + key
                });
                this.positionMarkers.set(key,marker);
            }
        }
    }
}