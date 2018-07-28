import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// FireBase import
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { FirebaseDatabase } from '@firebase/database-types';

// Classes import
import { _Position } from '../../classes/position';
import { _ImmovableData } from '../../classes/immovable_data';
import { PositionMarkerManager } from '../../classes/positionMarkerManager'

// Google maps typing and const
import { mapStyle } from '../../environments/mapStyle'
import { } from '@types/googlemaps'

// Services
import { ImmovableService } from '../services/immovable.service';
import { ImmovableManager } from '../../classes/immovableManager';
import { _VehicleData } from '../../classes/data';


@Component({
  selector: 'app-rtmap',
  templateUrl: './rtmap.component.html',
  styleUrls: ['./rtmap.component.scss']
})
export class RtmapComponent implements OnInit {

  //reference to the view element
  @ViewChild('map') mapElement: any;

  map: google.maps.Map;
  posRef: AngularFireObject<object>;
  immoRef: AngularFireObject<object>;
  posMarker: PositionMarkerManager;
  immoMarker: ImmovableManager;
  alertNotification: any = { n : 0 }
  items: any;
  type: string;

  constructor(
    db: AngularFireDatabase,
    private immovableService: ImmovableService
  ) {
    this.posRef = db.object('data');
    this.immoRef = db.object('immovable_data');
   }

  ngOnInit() {
    // new map
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      disableDefaultUI: true,
      center: { lat: 33.9577659, lng: -6.8752437 },
      zoom: 15,
      styles: mapStyle,
      // gestureHandling: "none"
    });

    this.posMarker = new PositionMarkerManager(this.map);
    this.immoMarker = new ImmovableManager(this.map,this.alertNotification);

    this.immovableService.getImmovables(0, 0, 0, 0).subscribe(data => {
      this.immoMarker.init(data);
    })

    this.posRef.valueChanges().subscribe(val => {
      let map
      if (val) {
        map = new Map<string, _VehicleData>(Object.entries(val));
      }
      else {
        map = new Map<string, _VehicleData>();
      }

      this.posMarker.update(map)
    })

    this.immoRef.valueChanges().subscribe(val => {
      let map
      if (val) {
        map = new Map<string, _ImmovableData>(Object.entries(val));
      }
      else {
        map = new Map<string, _ImmovableData>();
      }

      this.immoMarker.update(map)
    })
  }

  vehicles() : void {
    this.items = this.posMarker.vehicleMap;
    this.type = "Véhicule";
  }

  immovables() : void {
    this.items = this.immoMarker.immovableMap;
    this.type = "Point";
  }

  alerts() : void {
    this.items = this.immoMarker.alertMap;
    this.type = "Alerte"
  }

  goTo(data : any) {
    if (this.type == "Véhicule") {
      this.map.setCenter({lat:data.lat,lng:data.lng})
    }
    if (this.type == "Point" || this.type == "Alerte") {
      this.map.setCenter(this.immoMarker.immovableMarkers.get(data.key).getPosition())
    }

  }

}
