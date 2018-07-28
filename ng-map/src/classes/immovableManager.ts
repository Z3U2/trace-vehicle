import { _Immovable } from "./immovable";
import { _ImmovableData } from "./immovable_data";
import { conf } from "../environments/conf";


export class ImmovableManager {

    map: google.maps.Map;
    immovableMarkers: Map<string,google.maps.Marker>;
    immovableMap : Map<string,_ImmovableData>;
    alertMap: Map<string,_ImmovableData>;
    alertNotification: any;
    image: string = 'assets/images/rubbish-bin-delete-button.png';
    constructor(map : google.maps.Map,alertNotification) {
        this.map = map;
        this.immovableMarkers = new Map<string,google.maps.Marker>();
        this.immovableMap = new Map<string, _ImmovableData>();
        this.alertMap = new Map<string, _ImmovableData>();
        this.alertNotification = alertNotification;
    }

    init(arr : _Immovable[]) : void {
        console.log(arr)
        for (let immovable of arr) {
            let marker = new google.maps.Marker({
                position: {
                    lat: immovable.lat,
                    lng: immovable.lng
                },
                map: this.map,
                icon: {
                   url: this.image,
                   anchor: new google.maps.Point(12,12) 
                },
                title: 'Fixed' + immovable._id
            });
            this.immovableMarkers.set(immovable._id,marker)
            this.immovableMap.set(immovable._id,new _ImmovableData())
        }
    }

    update(val : Map<string,_ImmovableData>): void {
        for (let key of Array.from(this.alertMap.keys())) {
            if (val.has(key)) {
                let info = val.get(key);
                if (info.load < conf.threshold) {
                    this.alertMap.delete(key)
                    this.alertNotification.n--;
                }
            }
        }
        for (let key of Array.from(val.keys())) {
            const info = val.get(key);
            this.immovableMap.set(key,info)
            if (this.immovableMarkers.has(key) && info.load > conf.threshold) {                if (info.load > conf.threshold ) {
                if (this.alertMap.has(key)) {
                    let data = this.alertMap.get(key);
                    data.load = info.load;
                    data.time = info.time;
                }    
                else {
                    this.alertMap.set(key,info)
                    this.alertNotification.n++;
                }
                }
            }
        }
    }

}